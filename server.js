import path from 'path';
import chokidar from 'chokidar';
import {
  Worker,
  // isMainThread,
  // parentPort,
  // workerData,
} from 'worker_threads';

const baseDir = import.meta.dirname.split('node_modules')[0];
chokidar.watch(
  path.join(baseDir, '_rapide_run.txt'),
  { ignoreInitial: true }
).on('all', (event, path) => {
  console.log("YEAH", event, path);
});

export default async function createServer(type = 'dev') {
  const worker = new Worker(path.join(import.meta.dirname, 'serverWorker.js'), {
    workerData: type
  });
}