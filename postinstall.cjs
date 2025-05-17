const fs = require('fs');
const path = require('path');

// modify npm scripts in package json
const dirname = __dirname;
const lastIndex = dirname.lastIndexOf('node_modules');
const baseFolder = dirname.slice(0, lastIndex > 0 ? lastIndex : Infinity);
const packageJsonPath = path.join(baseFolder, 'package.json');
const packageContents = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
packageContents.scripts = {
  ...packageContents.scripts,
  'start': 'node node_modules/react-rapide dev',
  'dev': 'node node_modules/react-rapide dev',
  'preview': 'node node_modules/react-rapide preview',
  'rr': 'node node_modules/react-rapide',
  'react-rapide': 'node node_modules/react-rapide'
};
fs.writeFileSync(packageJsonPath, JSON.stringify(packageContents, null, '  '), 'utf-8');

// killall current vite server if any
const viteConfigPath = path.join(baseFolder, 'vite.config.ts');
if (fs.existsSync(viteConfigPath)) {
  let contents = fs.readFileSync(viteConfigPath, 'utf-8');
  fs.writeFileSync(viteConfigPath, 'process.exit();', 'utf-8');
  console.log("OK");
  setTimeout(() => {
    console.log("OK2");
    fs.writeFileSync(viteConfigPath, contents, 'utf-8');
  }, 2000);
}



