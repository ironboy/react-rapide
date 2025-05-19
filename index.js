// react-rapide, ironboy 2025, app
import fs from 'fs';
import path from 'path';
import c from 'chalk';
import url from 'url';
import cliSelect from 'cli-select';
import { execSync } from 'child_process';
import { getBranches, getReadMeOfBranch, getFolderOfBranch } from './helpers.js';
import autoGenerateRoutes from './auto-generate-routes.js';
import createServer from './server.js';

const log = (...x) => console.log(...x);
const dirname = import.meta.dirname;
const tempDir = path.join(dirname, '..');
const rapideBaseDir = path.join(dirname, '..', '..');
const undoFolder = path.join(rapideBaseDir, 'undoFiles');
const arg = process.argv.slice(2)[0] || 'helpFast';
const commandBranches = await getBranches('ironboy', 'react-rapide', (x) => x.startsWith('command-'));
const commands = commandBranches.map(x => x.split('command-')[1].split(/\d{1,}-/)[1]).filter(x => x);
const defaultPostDo = {
  patchPackages: 'auto',
  replace: { files: [['index.html']], folders: [['public'], ['src'], ['sass'], ['backend']] },
  message: 'All done!'
};

log('');
await runCommand(arg).catch(_e => { });
log('');

async function helpFast() {
  ;
  let commandsList = [
    '',
    'help',
    'undo',
    'auto-routes',
    ...commands
  ];
  log('');
  log(c.bold('Run any command by choosing it here'));
  log(c.bold('or by typing ' + c.green('npm run rr') + c.blue(' command')));
  log('');
  log(c.bold(c.green('For more info see the help: ') + 'npm run rr help'));
  log('');
  log(c.blue(c.bold(('Available commands:'))));
  let result = await cliSelect({
    values: commandsList,
    valueRenderer: (value, selected) => {
      if (selected) {
        return c.bold(c.green(value));
      }
      return c.bold(value);
    },
    selected: '> ',
    unselected: '  ',
    defaultValue: 1
  }).catch(_e => { });
  clearConsole();
  let { value } = result || {};
  value && runCommand(value);
}

async function help() {
  log('');
  log(c.bold('Run any command by choosing it after typing ' + c.blue('npm run rr')));
  log(c.bold('or by typing ' + c.blue('npm run rr') + c.green(' command')));
  log('');
  log(c.blue(c.bold(('Available commands explained:'))));
  let disp = [...commands];
  log('');
  log(c.bold(c.green('help')));
  log('Displays info about other commands.');
  log('');
  log(c.bold(c.green('undo')));
  log('Resets files, folders and installed npm modules to their state before the changes made by the latests react-rapide command.');
  log('');
  log(c.bold(c.green('auto-routes')));
  log('Auto-generates a routes.ts file, if your project is setup according to the example found in router-decentralized.');
  for (let branch of commandBranches) {
    let name = disp.shift();
    if (!name) { continue; }
    log('');
    log(c.bold(c.green(name)));
    log(await getReadMeOfBranch('ironboy', 'react-rapide', branch));
  }
  log('');
}

async function autoRoutes() {
  let baseDir = dirname.slice(0, dirname.lastIndexOf('node_modules'));
  while (baseDir.endsWith('/') || baseDir.endsWith('\\')) { baseDir = baseDir.slice(0, -1); }
  let srcDir = path.join(baseDir, 'src');
  log('');
  try {
    autoGenerateRoutes(srcDir);
    log(c.bold(c.green('routes.ts created!')));
  }
  catch (_e) { log(c.bold(c.red('Something went wrong!'))); }
  log('');
}

async function runCommand(command) {
  clearConsole();
  let mainRapide = fs.readFileSync(path.join(dirname, './main-rapide.tsx'), 'utf-8');
  log(c.green(c.bold(('REACT RAPIDE' + (command === 'helpFast' ? '' : ': ' + command)))));
  if (command === 'helpFast') { helpFast(); return; }
  if (command === 'help') { await help(); return; }
  if (command === 'undo') { undo(); return; }
  if (command === 'auto-routes') { autoRoutes(); return; }
  let index = commands.indexOf(command);
  if (index < 0) {
    if (command === 'dev') { await createServer('dev'); return; }
    if (command === 'preview') { await createServer('preview'); return; }
    log(c.red(c.bold('No such command: ' + command)));
    return;
  }
  let branch = commandBranches[index];
  await getFolderOfBranch(tempDir, 'ironboy', 'react-rapide', branch);
  let baseDir = dirname.slice(0, dirname.lastIndexOf('node_modules'));
  while (baseDir.endsWith('/') || baseDir.endsWith('\\')) { baseDir = baseDir.slice(0, -1); }
  let remoteBaseDir = path.join(tempDir, 'react-rapide-' + branch);
  let func = (await import(url.pathToFileURL(path.join(remoteBaseDir, 'z-rapide.js')))).default;
  let result = func() || {};
  let postDo = { ...defaultPostDo, ...result };
  fs.existsSync(undoFolder) && fs.rmSync(undoFolder, { recursive: true, force: true });
  fs.mkdirSync(undoFolder);
  if (postDo.patchPackages) {
    let result = patchPackage(baseDir, remoteBaseDir, postDo.patchPackages);
    if (result) {
      fs.writeFileSync(path.join(undoFolder, 'package.json'), result.originalPackageContent, 'utf-8');
    }
  }

  // In order to don't crash the vite dev server:
  // If the src folder is part of postDo - give it an empty src/main.tsx initially
  // Wait a while to make the vite dev server understand this
  // then at the end after all other copying copy the real src/main.tsx
  // (when all other files are in place)
  let mainContent, oldMainContent;
  if (((postDo.replace || {}).folders || []).find(x => x.length === 1 && x[0] === 'src')) {
    oldMainContent = !fs.existsSync(path.join(baseDir, 'src', 'main.tsx')) ? '' : fs.readFileSync(path.join(baseDir, 'src', 'main.tsx'), 'utf-8');
    mainContent = fs.readFileSync(path.join(remoteBaseDir, 'src', 'main.tsx'), 'utf-8');
    fs.writeFileSync(path.join(remoteBaseDir, 'src', 'main.tsx'), mainRapide, 'utf-8');
    fs.writeFileSync(path.join(baseDir, 'src', 'main.tsx'), mainRapide, 'utf-8');
    await sleep(2000);
  }

  for (let folder of ((postDo.replace || {}).folders || [])) {
    replaceFolder(baseDir, remoteBaseDir, ...folder);
  }
  for (let file of ((postDo.replace || {}).files || [])) {
    replaceFile(baseDir, remoteBaseDir, ...file);
  }

  // Now write the real main (see above)
  if (mainContent) {
    fs.writeFileSync(path.join(baseDir, 'src', 'main.tsx'), mainContent, 'utf-8');
    fs.writeFileSync(path.join(undoFolder, 'src', 'mainREAL.tsx'), oldMainContent, 'utf-8');
  }

  // write a file that acts as a message to the server to restart
  fs.writeFileSync(path.join(baseDir, '_react_rapide_done.txt'), 'done', 'utf-8');

  log(c.green(c.bold(postDo.message)));
  log('');

  // Because of problems seen in Windows with the Vite server caching public
  // (in some strange way - new images doesn't show etc...)
  // let us force a server restart by "touching" vite.config (rewrite it)
  let content = fs.readFileSync(path.join(baseDir, 'vite.config.ts'), 'utf-8');
  fs.writeFileSync(path.join(baseDir, 'vite.config.ts'), content, 'utf-8');

  // explicitely exit
  process.exit();

};

function replaceFolder(target, org, ...folderName) {
  const undo = org === undoFolder;
  let file = folderName[folderName.length - 1] === true;
  file && folderName.pop();
  target = path.join(target, ...folderName);
  let undoFolderTarget = path.join(undoFolder, ...folderName);
  org = path.join(org, ...folderName);
  if (
    folderName[0] === 'backend' && folderName.length === 1 &&
    !fs.existsSync(org) && fs.existsSync(target)
  ) {
    // send signal to server to remove backend folder if not needed
    // we can't do it here because db:s need to be closed etc.
    // fs.writeFileSync(path.join(target, '__remove_me.txt'), 'REMOVE ME', 'utf-8');
  }
  if (!fs.existsSync(org)) { return; }
  !undo && fs.existsSync(target) && fs.cpSync(target, undoFolderTarget, file ? {} : { recursive: true });
  fs.existsSync(target) && fs.rmSync(target, file ? {} : { recursive: true, force: true });
  fs.cpSync(org, target, file ? {} : { recursive: true });
  !undo && !file && log(c.bold('Replacing the ' + c.blue(folderName[folderName.length - 1]) + '-folder'));
  !undo && file && log(c.bold('Replacing the file ' + c.blue(folderName[folderName.length - 1])));
}

function replaceFile(...args) {
  return replaceFolder(...args, true);
}

function patchPackage(target, org, patch) {
  let pTarget = path.join(target, 'package.json');
  let pOrg = path.join(org, 'package.json');
  if (!fs.existsSync(pTarget) || !fs.existsSync(pOrg)) { return; }
  let originalPackageContent = fs.readFileSync(pTarget, 'utf-8');
  let pTargetJson = JSON.parse(originalPackageContent);
  let pOrgJson = JSON.parse(fs.readFileSync(pOrg, 'utf-8'));
  if (patch === 'auto') {
    patch = {};
    for (let type of ['dependencies', 'devDependencies']) {
      patch[type] = {};
      let td = pTargetJson[type] = pTargetJson[type] || {};
      let od = pOrgJson[type] = pOrgJson[type] || {};
      for (let key in od) {
        if (!td[key]) {
          // non-existant
          patch[type][key] = od[key];
        }
        else if (compareVersion(td[key], od[key])) {
          // older in target
          patch[type][key] = od[key];
        }
      }
    }
  }
  let anythingChanged = false;
  for (let type of ['dependencies', 'devDependencies']) {
    pTargetJson[type] = pTargetJson[type] || {};
    let toAdd = patch[type];
    for (let key in toAdd) {
      anythingChanged = true;
      pTargetJson[type][key] = toAdd[key];
      let mess = c.bold('npm install ');
      mess += c.bold(c.blue(key + '@' + toAdd[key]));
      mess += type === 'dependencies' ? '' : c.bold(' --save-dev');
      log(mess);
    }
    pTargetJson[type] = { ...pTargetJson[type], ...patch[type] };
  }
  if (!anythingChanged) { return false; }
  fs.writeFileSync(pTarget, JSON.stringify(pTargetJson, null, '  '), 'utf-8');
  execSync('cd "' + target + '" && npm install && npm audit fix');
  return { patched: true, originalPackageContent };
}

function compareVersion(targetV, orgV) {
  // ~ update to newer patch versions
  // ^ update to newer minor versions
  // but for now ignore this and just make newer!
  // return false if no update needed (target version same or newer)
  // otherwise return true (update needed)
  targetV = targetV.split('.').map(x => +x.replace(/\D/g, ''));
  orgV = orgV.split('.').map(x => +x.replace(/\D/g, ''));
  if (orgV[0] > targetV[0]) { return true; }
  if (orgV[1] > targetV[1]) { return true; }
  if (orgV[2] > targetV[2]) { return true; }
  return false;
}

function undo() {
  let baseDir = dirname.slice(0, dirname.lastIndexOf('node_modules'));
  if (!fs.existsSync(undoFolder)) {
    log(c.red(c.bold('Nothing to undo...')));
    return;
  }
  let toRestore = fs.readdirSync(undoFolder).map(x => ({
    name: x,
    path: path.join(undoFolder, x),
    isDir: fs.statSync(path.join(undoFolder, x)).isDirectory()
  }));
  for (let { name } of toRestore.filter(x => x.isDir)) {
    replaceFolder(baseDir, undoFolder, name.replace(baseDir, ''));
    log(c.bold('Restoring the ' + c.blue(name) + '-folder'));
  }
  for (let { name } of toRestore.filter(x => !x.isDir)) {
    replaceFile(baseDir, undoFolder, name.replace(baseDir, ''));
    log(c.bold('Restoring the file ' + c.blue(name)));
  }
  if (toRestore.find(x => x.name === 'package.json')) {
    let packageLockPath = path.join(baseDir, 'package.lock.json');
    let nodModulesPath = path.join(baseDir, 'node_modules');
    fs.existsSync(packageLockPath) && fs.rmSync(packageLockPath);
    fs.existsSync(nodModulesPath) && fs.rmSync(packageLockPath, { recursive: true, force: true });
    execSync('cd "' + baseDir + '" && npm install');
    log(c.bold('Sync of npm modules to match restored package.json'));
  }
  fs.rmSync(undoFolder, { recursive: true, force: true });
  // restore real main
  let pathToRealMain = path.join(baseDir, 'src', 'mainREAL.tsx');
  let pathToMain = path.join(baseDir, 'src', 'main.tsx');
  if (fs.existsSync(pathToRealMain)) {
    fs.existsSync(pathToMain) && fs.rmSync(pathToMain);
    fs.renameSync(pathToRealMain, pathToMain);
  }
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function clearConsole() {
  process.stdout.write('\x1Bc');
}