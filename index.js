// react-rapide, ironboy 2025, app
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { getBranches, getReadMeOfBranch, getFolderOfBranch } from './helpers.js';

const log = (...x) => console.log(x);
const dirname = import.meta.dirname;
const tempDir = path.join(dirname, '..');
const arg = process.argv.slice(2)[0];

log(chalk.green("REACT RAPIDE"), tempDir);
log(chalk.blue('Available commands:'));
