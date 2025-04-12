// react-rapide, ironboy 2025, app
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { getBranches, getReadMeOfBranch, getFolderOfBranch } from './helpers.js';

const log = (...x) => console.log(...x);
const dirname = import.meta.dirname;
const tempDir = path.join(dirname, '..');
const arg = process.argv.slice(2)[0];
const commandBranches = await getBranches('ironboy', 'react-rapide', (x) => x.startsWith('command-'));
const commands = commandBranches.map(x => 'npm run react-rapide ' + x.split('command-')[1]);

log('');
help();
log('');

function help() {
  log(chalk.green("REACT RAPIDE"));
  log(chalk.blue('Available commands:'));
  log(chalk.bold(commands.join('\n')));
}