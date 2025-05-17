import { isFreePort } from 'find-free-ports';
import express from 'express';
import {
  createServer as createViteServer,
  version as viteVersion
} from 'vite';
import c from 'chalk';

const startTime = Date.now();

const devServer = true; // if false assume preview

// Find free ports
// (one for the server and one for
//  Vite HMR - hot module reload - using web socket)
let port = devServer ? 5173 : 4173;
while (!await isFreePort(port)) { port++; }
let hmrPort = 27018;
while (!await isFreePort(hmrPort)) { hmrPort++; }

// Create the express server
const app = express();

// Create the vite dev server
if (devServer) {
  const viteDevServer = await createViteServer({
    server: { middlewareMode: true, hmr: { port: hmrPort } },
    host: '0.0.0.0',
    appType: 'spa',
    hmr: { port }
  });

  // Add our own middleware
  app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
      res.json({ ok: true });
    }
    else { next(); }
  });

  // Add the vite dev server as middleware
  app.use(viteDevServer.middlewares);
}

// Create the preview server
else {
  console.log("THIS WILL CREATE A PREVIEW SERVER");
}

// Start up the server
app.listen(port, () => {
  process.stdout.write('\x1Bc'); // clear console
  let timeTaken = Date.now() - startTime;
  devServer && console.log(
    c.green(c.bold('  VITE ') + 'v' + viteVersion)
    + c.gray('  ready in ') + c.white(c.bold(timeTaken) + ' ms') + '\n'
  );
  console.log(c.green('  ➜ ') + c.white(c.bold('Local:  '))
    + c.cyan('http://localhost:' + port + '/'));
  console.log(c.green('  ➜ ') + c.white(c.bold('Extra:  '))
    + c.cyan('React Rapide installed') + '\n');
});