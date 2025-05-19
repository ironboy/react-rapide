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
    let worker = startWorker();
    chokidar.watch(
      path.join(baseDir, '_rapide_run.txt'),
      { ignoreInitial: true }
    ).on('all', (event) => {
      if (event === 'add') {
        worker.postMessage('exit');
      }
      if (event === 'unlink') {
        worker = startWorker();
      }
    });
  }
  catch (e) { console.log(e); }
}

function startWorker() {
  const worker = new Worker(path.join(import.meta.dirname, 'serverWorker.js'), {
    workerData: type
  });
  return worker;
}