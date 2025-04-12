// react-rapide, ironboy 2025, app
import fs from 'fs';
import path from 'path';
import c from 'chalk';
import { getBranches, getReadMeOfBranch, getFolderOfBranch } from './helpers.js';

const log = (...x) => console.log(...x);
const dirname = import.meta.dirname;
const tempDir = path.join(dirname, '..');
const arg = process.argv.slice(2)[0] || 'help';
const commandBranches = await getBranches('ironboy', 'react-rapide', (x) => x.startsWith('command-'));
const commands = commandBranches.map(x => x.split('command-')[1]);
const commandsToDisplay = commands.map(x => 'npm run react-rapide ' + x);

log('');
await runCommand(arg);
log('');

function help() {
  log(c.green(c.bold(("REACT RAPIDE"))));
  log(c.blue(c.bold(('Available commands:'))));
  log(c.bold(commandsToDisplay.join('\n')));
}

async function runCommand(command) {
  if (command === 'help') { help(); return; }
  let index = commands.indexOf(command);
  if (index < 0) {
    console.log(c.red(c.bold('No such command: ' + command)));
  }
  let branch = commandBranches[index];
  getFolderOfBranch(tempDir, 'ironboy', 'react-rapide', branch);
  await import(path.join(tempDir, 'react-rapide-' + branch, 'z-rapide.js'));
}