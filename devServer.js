import { isFreePort } from 'find-free-ports';
import express from 'express';
import {
  createServer as createViteServer,
  version as viteVersion
} from 'vite';
import c from 'chalk';

const startTime = Date.now();

// Find free ports
// (one for the server and one for
//  Vite HMR - hot module reload - using web socket)
let port = 5173;
while (!await isFreePort(port)) { port++; }
let hmrPort = 27018;
while (!await isFreePort(hmrPort)) { hmrPort++; }

// Create the express server
const app = express();

// Create the vite dev server
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

// Addd the vite dev server as middleware
app.use(viteDevServer.middlewares);

// Start up the server
app.listen(port, () => {
  let timeTaken = Date.now() - startTime;
  console.log(
    c.green(c.bold('  VITE ') + 'v' + viteVersion)
    + c.gray('  ready in ') + c.white(c.bold(timeTaken) + ' ms') + '\n'
  );
  console.log(c.green('  ➜ ') + c.white(c.bold('Local:  '))
    + c.cyan('http://localhost:' + port));
  console.log(c.green('  ➜ ') + c.white(c.bold('Extra:  '))
    + c.cyan('Backend with REST-api and SQLite DB (ironboy)') + '\n');
});