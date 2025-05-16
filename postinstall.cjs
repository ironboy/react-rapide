const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// killall node processes
// (because vite can be started and we  want it to start through our script instead)
execSync(process.platform === "win32" ? 'taskkill /f /im node.exe' : 'killall node');

// modify npm scripts in package json
const dirname = __dirname;
const lastIndex = dirname.lastIndexOf('node_modules');
const baseFolder = dirname.slice(0, lastIndex > 0 ? lastIndex : Infinity);
const packageJsonPath = path.join(baseFolder, 'package.json');
const packageContents = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
packageContents.scripts = {
  ...packageContents.scripts,
  'start': 'react-rapide dev',
  'dev': 'react-rapide dev',
  'preview': 'react-rapide preview',
  'rr': 'react-rapide',
  'react-rapide': 'react-rapide'
};
fs.writeFileSync(packageJsonPath, JSON.stringify(packageContents, null, '  '), 'utf-8');



