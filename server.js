export default function createServer(type = 'dev') {
  let rrFolder = import.meta.dirname;
  rrFolder = rrFolder.slice(0, rrFolder.lastIndexOf('temp'));
  console.log(rrFolder);
}