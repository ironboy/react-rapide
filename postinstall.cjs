const fs = require('fs');
const path = require('path');

const dirname = __dirname;
const lastIndex = dirname.lastIndexOf('node_modules');
const baseFolder = dirname.slice(0, lastIndex > 0 ? lastIndex : Infinity);
const packageJsonPath = path.join(baseFolder, 'package.json');
const packageContents = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
packageContents.scripts = {
  ...packageContents.scripts,
  'react-rapide': 'node node_modules/react-rapide',
  'rr': 'node node_modules/react-rapide'
};
fs.writeFileSync(packageJsonPath, JSON.stringify(packageContents, null, '  '), 'utf-8');