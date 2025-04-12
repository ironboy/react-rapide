// react-rapide, ironboy 2025, app
import fs from 'fs';
import path from 'path';
import c from 'chalk';
import { getBranches, getReadMeOfBranch, getFolderOfBranch } from './helpers.js';

const log = (...x) => console.log(...x);
const dirname = import.meta.dirname;
const tempDir = path.join(dirname, '..');
const arg = process.argv.slice(2)[0] || 'helpFast';
const commandBranches = await getBranches('ironboy', 'react-rapide', (x) => x.startsWith('command-'));
const commands = commandBranches.map(x => x.split('command-')[1]);
const commandsToDisplay = commands.map(x => 'npm run react-rapide ' + x);
const defaultPostDo = {
  patchPackage: 'auto',
  replaceSrc: true,
  replaceMain: true,
  replacePublic: false,
  replaceIndex: true
};

log('');
await runCommand(arg);
log('');

function helpFast() {
  log(c.blue(c.bold(('Available commands:'))));
  log(c.bold(['npm run react-rapide help', ...commandsToDisplay].join('\n')));
  log();
  log(c.bold(c.green('For more info run ') + 'npm run react-rapide help'));
}

async function help() {
  log(c.blue(c.bold(('Available commands explained:'))));
  let readMes = {};
  let disp = [...commandsToDisplay];
  log('');
  log(c.bold('npm run react-rapide help'));
  log('  This command displays info about other commands.');
  for (let branch of commandBranches) {
    log('');
    log(c.bold(disp.shift()));
    log('  ' + (await getReadMeOfBranch('ironboy', 'react-rapide', branch)));
  }
}

async function runCommand(command) {
  log(c.green(c.bold(('REACT RAPIDE: ' + (command === 'helpFast' ? '' : command)))));
  if (command === 'helpFast') { helpFast(); return; }
  if (command === 'help') { await help(); return; }
  let index = commands.indexOf(command);
  if (index < 0) {
    log(c.red(c.bold('No such command: ' + command)));
  }
  let branch = commandBranches[index];
  let ok = await getFolderOfBranch(tempDir, 'ironboy', 'react-rapide', branch);
  let func = (await import(path.join(tempDir, 'react-rapide-' + branch, 'z-rapide.js'))).default;
  let result = func() || {};
  let postDo = { ...defaultPostDo, ...result };
  console.log(postDo, postDo);
};