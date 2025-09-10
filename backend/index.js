import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import proxy from 'express-http-proxy';
import killPort from 'kill-port';

export default function startBackend(app) {

  // Create the dist folder if it does not exist
  const distFolder = path.join(import.meta.dirname, '..', 'dist');
  fs.existsSync(distFolder) || (
    fs.mkdirSync(distFolder),
    fs.writeFileSync(path.join(distFolder, 'index.html'), 'Hej', 'utf-8')
  );

  // Calculate db path
  const dbPath = path.join(import.meta.dirname, '_db.sqlite3');

  // Start .NET backend from Node.js
  // (and send distFolder/frontendFolder + dbPath as arguments to it)
  setTimeout(async () => {
    // await killPort(5001, 'tcp').catch(_e => { });
    spawn(
      `dotnet run "${distFolder}" "${dbPath}"`,
      { cwd: import.meta.dirname, stdio: 'inherit', shell: true }
    );
  }, 1);

  // Proxy traffic to the backend if teh request starts with /api
  app.use('/api', proxy('localhost:5001', {
    proxyReqPathResolver(req) {
      return '/api' + req.url;
    }
  }));

}