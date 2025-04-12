// react-rapide, ironboy 2025, app
import fs from 'fs';
import path from 'path';
import c from 'chalk';
import { execSync } from 'child_process';
import { getBranches, getReadMeOfBranch, getFolderOfBranch } from './helpers.js';

const log = (...x) => console.log(...x);
const dirname = import.meta.dirname;
const tempDir = path.join(dirname, '..');
const rapideBaseDir = path.join(dirname, '..', '..');
const undoFolder = path.join(rapideBaseDir, 'undoFiles');
const arg = process.argv.slice(2)[0] || 'helpFast';
const commandBranches = await getBranches('ironboy', 'react-rapide', (x) => x.startsWith('command-'));
const commands = commandBranches.map(x => x.split('command-')[1]);
const commandsToDisplay = commands.map(x => 'npm run react-rapide ' + x);
const defaultPostDo = {
  patchPackages: 'auto',
  replace: { files: ['index.html'], folders: ['src'] },
  message: 'All done!'
};

log('');
await runCommand(arg);
log('');

function helpFast() {
  log(c.blue(c.bold(('Available commands:'))));
  log(c.bold([
    'npm run react-rapide help',
    'npm run react-rapide undo',
    ...commandsToDisplay
  ].join('\n')));
  log();
  log(c.bold(c.green('For more info run ') + 'npm run react-rapide help'));
}

async function help() {
  log(c.blue(c.bold(('Available commands explained:'))));
  let disp = [...commandsToDisplay];
  log('');
  log(c.bold('npm run react-rapide help'));
  log('Displays info about other commands.');
  log('');
  log(c.bold('npm run react-rapide undo'));
  log('Resets files, folders and installed npm modules to their state before the changes made by the latests react-rapide command.');
  for (let branch of commandBranches) {
    log('');
    log(c.bold(disp.shift()));
    log(await getReadMeOfBranch('ironboy', 'react-rapide', branch));
  }
}

async function runCommand(command) {
  log(c.green(c.bold(('REACT RAPIDE: ' + (command === 'helpFast' ? '' : command)))));
  if (command === 'helpFast') { helpFast(); return; }
  if (command === 'help') { await help(); return; }
  if (command === 'undo') { undo(); return; }
  let index = commands.indexOf(command);
  if (index < 0) {
    log(c.red(c.bold('No such command: ' + command)));
  }
  let branch = commandBranches[index];
  await getFolderOfBranch(tempDir, 'ironboy', 'react-rapide', branch);
  let baseDir = dirname.slice(0, dirname.lastIndexOf('node_modules'));
  while (baseDir.endsWith('/') || baseDir.endsWith('\\')) { baseDir = baseDir.slice(0, -1); }
  let remoteBaseDir = path.join(tempDir, 'react-rapide-' + branch);
  let func = (await import(path.join(remoteBaseDir, 'z-rapide.js'))).default;
  let result = func() || {};
  let postDo = { ...defaultPostDo, ...result };
  fs.existsSync(undoFolder) && fs.rm(undoFolder, { resursive: true, force: true });
  fs.mkdirSync(undoFolder);
  for (let folder of ((postDo.replace || {}).folders || [])) {
    replaceFolder(baseDir, remoteBaseDir, folder);
  }
  for (let file of ((postDo.replace || {}).files || [])) {
    replaceFile(baseDir, remoteBaseDir, file);
  }
  postDo.patchPackages && patchPackage(baseDir, remoteBaseDir, postDo.patchPackages);
  log(c.green(c.bold(postDo.message)));
};

function replaceFolder(target, org, ...folderName) {
  const undo = org === undoFolder;
  let file = folderName[folderName.length - 1] === true;
  file && folderName.pop();
  target = path.join(target, ...folderName);
  let undoFolderTarget = path.join(undoFolder, ...folderName);
  org = path.join(org, ...folderName);
  if (!fs.existsSync(org)) { console.log("SHIT", org); return; }
  !undo && fs.existsSync(target) && fs.cpSync(target, undoFolderTarget, file ? {} : { recursive: true });
  fs.existsSync(target) && fs.rmSync(target, file ? {} : { recursive: true, force: true });
  fs.cpSync(org, target, file ? {} : { recursive: true });
  !file && log('Replacing the ' + c.bold(folderName[folderName.length - 1]) + '-folder');
  file && log('Replacing the file ' + c.bold(folderName[folderName.length - 1]));
}

function replaceFile(...args) {
  return replaceFolder(...args, true);
}

function patchPackage(target, org, patch) {
  let pTarget = path.join(target, 'package.json');
  let pOrg = path.join(org, 'package.json');
  if (!fs.existsSync(pTarget) || !fs.existsSync(pOrg)) { return; }
  let pTargetJson = JSON.parse(fs.readFileSync(pTarget, 'utf-8'));
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
  for (let type of ['dependencies', 'devDependencies']) {
    pTargetJson[type] = pTargetJson[type] || {};
    let toAdd = patch[type];
    for (let key in toAdd) {
      pTargetJson[type][key] = toAdd[key];
      let mess = c.bold('npm install ');
      mess += c.bold(c.blue(key + '@' + toAdd[key]));
      mess += type === 'dependencies' ? '' : c.bold(' --save-dev');
      log(mess);
    }
    pTargetJson[type] = { ...pTargetJson[type], ...patch[type] };
  }
  fs.writeFileSync(pTarget, JSON.stringify(pTargetJson, null, '  '), 'utf-8');
  execSync('cd "' + target + '" && npm install');
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
  for (let { name, path } of toRestore.filter(x => x.isDir)) {
    replaceFolder(baseDir, undoFolder, path);
    log(c.bold('Restoring the ' + c.blue(name) + '-folder'));
  }
  for (let { name, path } of toRestore.filter(x => !x.isDir)) {
    replaceFile(baseDir, undoFolder, path);
    log(c.bold('Restoring the file ' + c.blue(name)));
  }
}