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
    const baseDir = import.meta.dirname.split('node_modules')[0];
    let worker = startWorker(type);
    let watchFor = path.join(baseDir, '_react_rapide_done.txt');
    chokidar.watch(
      watchFor,
      { ignoreInitial: true }
    ).on('all', (event) => {
      if (event === 'add') {
        fs.rmSync(watchFor);
        worker = startWorker(type);
      }
    });
  }
  catch (e) { console.log(e); }
}

function startWorker(type) {
  const worker = new Worker(path.join(import.meta.dirname, 'serverWorker.js'), {
    workerData: type
  });
  worker.on('exit', () => console.log('The worker has exited...'));
  return worker;
}