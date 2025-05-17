import { isFreePort } from 'find-free-ports';
import express from 'express';
import {
  createServer as createViteServer,
  version as viteVersion
} from 'vite';
import c from 'chalk';

export default async function createServer(type = 'dev') {

  console.log("NOW TELL MED", type);

  const startTime = Date.now();

  // Find free ports
  // (one for the server and one for
  //  Vite HMR - hot module reload - using web socket)
  let port = type === 'dev' ? 5173 : 4173;
  while (!await isFreePort(port)) { port++; }
  let hmrPort = 27018;
  while (!await isFreePort(hmrPort)) { hmrPort++; }

  // Create the express server
  const app = express();

  console.log('type', type, port);

  // Create the vite dev server
  if (type === 'dev') {
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
  if (type === 'preview') {
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

}