import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import {
  Worker,
  // isMainThread,
  // parentPort,
  // workerData,
} from 'worker_threads';

export default async function createServer(type = 'dev') {
  try {
    let workerPath = import.meta.dirname;
    workerPath = workerPath.slice(0, workerPath.lastIndexOf('temp'));
    workerPath = path.join(workerPath, 'serverWorker.js');
    fs.copyFileSync(path.join(import.meta.dirname, 'serverWorker.js'), workerPath);
    const baseDir = import.meta.dirname.split('node_modules')[0];
    let worker = startWorker(type, workerPath);
    let watchFor = path.join(baseDir, '_react_rapide_done.txt');
    chokidar.watch(
      watchFor,
      { ignoreInitial: true, usePolling: true }
    ).on('all', (event) => {
      if (event === 'add') {
        fs.rmSync(watchFor);
        let tellFrontend = path.join(baseDir, 'public', '_react_rapide.txt');
        fs.writeFileSync(tellFrontend, 'done', 'utf-8');
        setTimeout(() => fs.existsSync(tellFrontend) && fs.rmS(tellFrontend), 3000);
        worker = startWorker(type, workerPath);
      }
    });
  }
  catch (e) { console.log(e); }
}

function startWorker(type, workerPath) {
  const worker = new Worker(workerPath, {
    workerData: type
  });
  worker.on('exit', () => {
    console.log('The worker has exited...');
  });
  return worker;
}