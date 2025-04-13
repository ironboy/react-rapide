// react-rapide, ironboy 2025
import fs from 'fs';
import path from 'path';
import { getFolderOfBranch } from './helpers.js';
const dirname = import.meta.dirname;
const tempDir = path.join(dirname, 'temp');

async function start() {
  let ok = await getFolderOfBranch(tempDir, 'ironboy', 'react-rapide', 'app');
  // This didn't work in Windows on psf paths so we try a relative path
  //ok && await import(path.join(tempDir, 'react-rapide-app', 'index.js'));
  ok && await import('./temp/react-rapide-app/index.js');
}

process.on('exit', () => {
  return;
  fs.rmSync(tempDir, { recursive: true, force: true });
  fs.mkdirSync(tempDir);
  fs.writeFileSync(path.join(tempDir, '_is_temp.txt'),
    'This is a temp dir neeeded by the app.', 'utf-8');
});

start();