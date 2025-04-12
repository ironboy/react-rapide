// react-rapide, ironboy 2025, app
import fs from 'fs';
import path from 'path';
import { getBranches, getReadMeOfBranch, getFolderOfBranch } from './helpers.js';
const dirname = import.meta.dirname;
const tempDir = path.join(dirname, '..');

console.log("HELLO THERE", tempDir);