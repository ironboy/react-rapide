import path from 'path';
import chokidar from 'chokidar';
import {
  Worker,
  // isMainThread,
  // parentPort,
  // workerData,
} from 'worker_threads';

chokidar.watch(
  path.join(import.meta.dirname, '_rapide_run.txt'),
  { ignoreInitial: true }
).on('all', (event, path) => {
  console.log("YEAH");
});

export default async function createServer(type = 'dev') {
  const worker = new Worker(path.join(import.meta.dirname, 'serverWorker.js'), {
    workerData: type
  });
}