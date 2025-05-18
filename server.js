import url from 'url';
import fs from 'fs';
import path from 'path';
import { isFreePort } from 'find-free-ports';
import express from 'express';
import {
  createServer as createViteServer,
  version as viteVersion
} from 'vite';
import c from 'chalk';
import chokidar from 'chokidar';

let currentServer;
let chokidarInitDone = false;
let baseDir;

export default async function createServer(type = 'dev') {
  try {
    const startTime = Date.now();
    baseDir = import.meta.dirname.split('node_modules')[0];

    // Find free ports
    // (one for the server and one for
    //  Vite HMR - hot module reload - using web socket)
    let port = type === 'dev' ? 5173 : 4173;
    while (!await isFreePort(port)) { port++; }
    let hmrPort = 27018;
    while (!await isFreePort(hmrPort)) { hmrPort++; }

    // Create the express server
    const app = express();
    currentServer = app;

    // check for middleware/server in local folder - add if it exists
    await addBackend(app);

    // Create the vite dev server
    if (type === 'dev') {
      const viteDevServer = await createViteServer({
        server: { middlewareMode: true, hmr: { port: hmrPort } },
        host: '0.0.0.0',
        appType: 'spa',
        hmr: { port }
      });

      addBasicMiddleware(app);

      // Add the vite dev server as middleware
      app.use(viteDevServer.middlewares);
    }

    // Create the preview server
    if (type === 'preview') {
      let pathToDist = path.join(baseDir, 'dist');
      if (!fs.existsSync(pathToDist)) {
        process.stdout.write('\x1Bc'); // clear console
        console.log('');
        console.log(c.bold('No dist folder found.'));
        console.log('  ' + c.green('➜ ') + 'Create it by running ' + c.green('npm run build') + '!');
        console.log('');
        process.exit();
      }
      addBasicMiddleware(app);
      app.use(express.static(pathToDist));
      app.use((_req, res, _next) => {
        // answer with index page on all non-existant routes (SPA behavior)
        res.sendFile(path.join(pathToDist, 'index.html'));
      });
    }

    // Start up the server
    app.listen(port, () => {
      process.stdout.write('\x1Bc'); // clear console
      let timeTaken = Date.now() - startTime;
      type === 'dev' && console.log(
        c.green(c.bold('  VITE ') + 'v' + viteVersion)
        + c.gray('  ready in ') + c.white(c.bold(timeTaken) + ' ms') + '\n'
      );
      console.log(c.green('  ➜ ') + c.white(c.bold('Local:  '))
        + c.cyan('http://localhost:' + port + '/'));
      console.log(c.green('  ➜ ') + c.white(c.bold('Extra:  '))
        + c.cyan('React Rapide installed') + '\n');
    });
  } catch (e) { console.log(e); }
}

// add backend
async function addBackend(app) {
  // using the express stack directly to remove old middleware from the previous backend!
  const backendFolder = path.join(baseDir, 'backend');
  const pathToBackend = path.join(backendFolder, 'index.js');
  const backendToImport = url.pathToFileURL(pathToBackend) + '?' + Date.now();
  let backendDefaultFunc;
  let stackCopy = [...app.router.stack];
  let middleWareIndex = stackCopy.findIndex(({ name }) => name === 'basicMiddleware');
  if (middleWareIndex >= 0) { stackCopy = stackCopy.slice(middleWareIndex); }
  app.router.stack.splice(0, Infinity);
  if (fs.existsSync(pathToBackend)) {
    backendDefaultFunc = (await import(backendToImport)).default;
    backendDefaultFunc(app);
  }
  // use chokidar to watch for changes to the backend folder
  !chokidarInitDone && chokidar.watch(
    baseDir,
    { ignoreInitial: true }
  ).on('all', (_event, path) => {
    if (!path.replaceAll('\\', '/').includes('/backend')) { return; }
    addBackend(app);
  });
  chokidarInitDone = true;
  app.router.stack.splice(Infinity, 0, ...stackCopy);
}

// Some basic middleware for both the  dev and preview server
function addBasicMiddleware(app) {
  app.use(function basicMiddleware(req, res, next) {
    if (req.url.startsWith('/api/')) {
      if (req.url === '/api/react-rapide') {
        res.json({ reactRapideRunningTheServer: true });
      }
      else if (req.url === '/api/react-rapide-kill-server') {
        process.exit();
      }
      else if (req.url === '/api/react-rapide-reload-stack') {
        res.json({ status: 'Reloading backend...' });
        addBackend(currentServer);
      }
      else {
        res.status(404);
        res.json({ error: 'Not found...' });
      }
    }
    else { next(); }
  });
}