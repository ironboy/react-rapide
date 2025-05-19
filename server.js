import fs from 'fs';
import path from 'path';
import nodemon from 'nodemon';

export default function createServer(type = 'dev') {
  try {
    let rrFolder = import.meta.dirname;
    rrFolder = rrFolder.slice(0, rrFolder.lastIndexOf('temp'));
    let serverFolderPath = path.join(rrFolder, 'server');
    fs.rmSync(serverFolderPath, { recursive: true, force: true });
    fs.mkdirSync(serverFolderPath);
    let serverPath = path.join(rrFolder, 'server', 'server2.js');
    fs.cpSync(path.join(import.meta.dirname, 'server2.js'), serverPath);
    nodemon({
      script: serverPath,
      watch: serverFolderPath,
      ext: '.js'
    });
    setTimeout(() => console.log("FOLDER TO WATCH", serverFolderPath), 1000);
  } catch (e) { console.log(e); }
}