import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import proxy from 'express-http-proxy';
import { isFreePort } from 'find-free-ports';

export default function startBackend(app) {

  let message = `<pre>
    In order to see something meaningful here
    run <b>npm run build</b> that compiles/builds
    your Vite-based project to the dist folder first.

    Then you can see the production version of the app
    served from the dist folder here.
  </pre>`;

  // Create the dist folder if it does not exist
  const distFolder = path.join(import.meta.dirname, '..', 'dist');
  fs.existsSync(distFolder) || (
    fs.mkdirSync(distFolder),
    fs.writeFileSync(path.join(distFolder, 'index.html'), message, 'utf-8')
  );

  // Calculate db path
  const dbPath = path.join(import.meta.dirname, '_db.sqlite3');

  // Start .NET backend from Node.js
  setTimeout(async () => {
    let startPort = 5001;
    while (!await isFreePort(startPort)) { startPort++; }
    let backendProcess = spawn(
      `dotnet run ${startPort} "${distFolder}" "${dbPath}"`,
      { cwd: import.meta.dirname, stdio: 'inherit', shell: true }
    );
    // Proxy traffic to the backend if the request starts with /api
    app.use('/api', proxy(`localhost:${startPort}`, {
      proxyReqPathResolver(req) {
        return '/api' + req.url;
      }
    }));

    setTimeout(() => {
      console.log(
        'Started C#/.NET based Minimal API\n' +
        '\nNote:\nStill visit the Vite Dev Port for all requests,\n' +
        'unless you want to check a build,\n' +
        `in that case visit the server port (${startPort}) directly.`);
    }, 3000);
  }, 1);

}