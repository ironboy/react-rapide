import path from 'path';
import {
  Worker,
  // isMainThread,
  // parentPort,
  // workerData,
} from ('worker_threads');

export default async function createServer(type = 'dev') {
  const worker = new Worker(path.join(import.meta.dirname, 'serverWorker.js'), {
    workerData: type
  });
}