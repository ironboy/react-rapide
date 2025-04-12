import fs from 'fs';
import path from 'path';

const dirname = import.meta.dirname;
const lastIndex = dirname.lastIndexOf('node_modules');
const baseFolder = dirname.slice(0, lastIndex > 0 ? dirname.slice(0, lastIndex) : dirname);
const packageJsonPath = path.join(baseFolder, 'package.json');
const packageContents = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageContents.scripts = { ...packageContents.scripts, 'react-rapide': 'node node_modules/react-rapide' };
fs.writeFileSync(packageJsonPath, JSON.stringify(packageContents, null, '  '), 'utf-8');
console.log("HEY MAN");