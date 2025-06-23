// ===== crypto-utils.js (new file) =====
import crypto from 'crypto';
import os from 'os';
import path from 'path';
import fs from 'fs';
import prompts from 'prompts';
import c from 'chalk';
//import { validateGitHubToken, getBranchesWithAuth, getFolderOfBranchWithAuth } from './helpers.js';

const dirname = import.meta.dirname;
const rapideBaseDir = dirname; // path.join(dirname, '..', '..');
const log = (...x) => console.log(...x);

// Simple encryption using machine-specific key
function getMachineKey() {
  const machineId = os.hostname() + os.platform() + os.arch();
  return crypto.createHash('sha256').update(machineId).digest('hex').slice(0, 32);
}

export function encryptToken(token) {
  const key = getMachineKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;

}

export function decryptToken(encryptedToken) {
  try {
    const key = getMachineKey();
    const [ivHex, encrypted] = encryptedToken.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (e) {
    return null; // Invalid token file
  }
}

// ===== helpers.js (additions to existing file) =====
// Add these functions to your existing helpers.js

export async function validateGitHubToken(token, testUser = 'ironboy', testRepo = 'react-rapide-teacher') {
  try {
    const response = await fetch(`https://api.github.com/repos/${testUser}/${testRepo}`, {
      headers: { 'Authorization': `token ${token}` }
    });
    return response.status === 200;
  } catch (e) {
    return false;
  }
}

export async function getBranchesWithAuth(gitHubUser, repository, token = null, filter = () => true) {
  const headers = token ? { 'Authorization': `token ${token}` } : {};

  try {
    // Use GitHub API for authenticated requests
    const response = await fetch(`https://api.github.com/repos/${gitHubUser}/${repository}/branches`, {
      headers
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const branches = await response.json();
    return branches
      .map(branch => branch.name)
      .filter(filter)
      .sort();
  } catch (e) {
    // Fallback to original scraping method for public repos
    if (!token) {
      return getBranches(gitHubUser, repository, filter);
    }
    throw e;
  }
}

const teacherTokenFile = path.join(rapideBaseDir, '.teacher-token');
const teacherRepo = 'react-rapide-teacher'; // Your private teacher repo
const teacherUser = 'ironboy'; // Your GitHub username

// Add teacher authentication functions
async function getTeacherToken() {
  if (fs.existsSync(teacherTokenFile)) {
    const encryptedToken = fs.readFileSync(teacherTokenFile, 'utf-8');
    return decryptToken(encryptedToken);
  }
  return null;
}

async function isTeacherAuthenticated() {
  const token = await getTeacherToken();
  if (!token) return false;

  return await validateGitHubToken(token, teacherUser, teacherRepo);
}

export async function teacherLogin() {
  log('');
  log(c.bold(c.green('TEACHER LOGIN')));
  log('');
  log('To access teacher examples, you need a GitHub Personal Access Token');
  log('with access to the private teacher repository.');
  log('');
  log('Generate one at: https://github.com/settings/tokens');
  log('Required permissions: repo (Full control of private repositories)');
  log('');
  const { token } = await prompts({
    type: 'password',
    name: 'token',
    message: 'Enter your GitHub Personal Access Token:'
  });

  if (!token) {
    log(c.yellow('Login cancelled.'));
    return false;
  }

  log('');
  log('Validating token...');

  if (await validateGitHubToken(token, teacherUser, teacherRepo)) {
    // Store encrypted token
    const encrypted = encryptToken(token);
    fs.writeFileSync(teacherTokenFile, encrypted, 'utf-8');

    log(c.green(c.bold('✓ Teacher access enabled!')));
    log('');
    return true;
  } else {
    log(c.red('✗ Invalid token or no access to teacher repository.'));
    log('');
    return false;
  }
}

export async function teacherLogout() {
  if (fs.existsSync(teacherTokenFile)) {
    fs.rmSync(teacherTokenFile, { force: true });
    if (fs.existsSync(teacherTokenFile)) {
      log(c.red("ERROR: COULD NOT LOGOUT"));
    }
    log(c.yellow('Teacher access removed.'));
  } else {
    log('No teacher access to remove.');
  }
  log('');
}

// Modified helpFast function
async function helpFast() {
  // Check teacher authentication
  const isTeacher = await isTeacherAuthenticated();
  let teacherCommands = [];
  let teacherToken = null;

  if (isTeacher) {
    teacherToken = await getTeacherToken();
    try {
      const teacherBranches = await getBranchesWithAuth(
        teacherUser,
        teacherRepo,
        teacherToken,
        (x) => x.startsWith('command-')
      );
      teacherCommands = teacherBranches
        .map(x => x.split('command-')[1].split(/\d{1,}-/)[1])
        .filter(x => x);
    } catch (e) {
      log(c.yellow('Warning: Could not load teacher examples.'));
    }
  }

  let commandsList = [
    'help',
    'auto-routes',
    ...commands
  ];

  // Add teacher-specific commands
  if (isTeacher && teacherCommands.length > 0) {
    commandsList.push('---TEACHER EXAMPLES---');
    commandsList.push(...teacherCommands);
  }

  // Add authentication commands
  commandsList.push('---AUTHENTICATION---');
  if (isTeacher) {
    commandsList.push('teacher-logout');
  } else {
    commandsList.push('teacher-login');
  }

  let descriptions = [
    'Show help about the code examples',
    'Build the src/routes.ts file (for use with decentralized routing)',
    'The initial source code after installing Vite (a counter)',
    'A very basic "Hello World" example (almost no source code)'
  ];

  // Add descriptions for teacher commands
  if (isTeacher && teacherCommands.length > 0) {
    descriptions.push(''); // Separator
    teacherCommands.forEach(() => descriptions.push('Teacher example'));
  }

  // Add auth descriptions
  descriptions.push(''); // Separator
  if (isTeacher) {
    descriptions.push('Remove teacher access');
  } else {
    descriptions.push('Login to access teacher examples');
  }

  let firstStateChange = true;
  let result = await prompts({
    type: 'select',
    name: 'value',
    hint: ' ',
    message: c.bold(c.green('REACT-RAPIDE ')
      + (isTeacher ? c.yellow('[TEACHER] ') : '')
      + '\n  Scaffolding & Learning by Examples for Vite+React+TS'),
    choices: commandsList.map(x => ({
      name: x,
      value: x,
      description: descriptions.shift() || 'Install example',
      disabled: x.startsWith('---') ? true : false
    })),
    onState: () => { firstStateChange && clearConsole(); firstStateChange = false; },
    initial: 0
  });

  clearConsole();
  let { value } = result || {};
  value && runCommand(value);
}

// Modified runCommand function (add these cases)
async function runCommand(command) {
  // ... existing code up to helpFast, help, auto-routes, undo ...

  // Add new authentication commands
  if (command === 'teacher-login') {
    await teacherLogin();
    // Restart menu to show new options
    await helpFast();
    return;
  }
  if (command === 'teacher-logout') {
    await teacherLogout();
    // Restart menu to show updated options
    await helpFast();
    return;
  }

  // Modified teacher command handling
  let index = commands.indexOf(command);
  let isTeacherCommand = false;
  let teacherToken = null;
  let branch;

  // Check if it's a teacher command
  if (index < 0) {
    const isTeacher = await isTeacherAuthenticated();
    if (isTeacher) {
      teacherToken = await getTeacherToken();
      try {
        const teacherBranches = await getBranchesWithAuth(
          teacherUser,
          teacherRepo,
          teacherToken,
          (x) => x.startsWith('command-')
        );
        const teacherCommandsList = teacherBranches
          .map(x => x.split('command-')[1].split(/\d{1,}-/)[1])
          .filter(x => x);

        index = teacherCommandsList.indexOf(command);
        if (index >= 0) {
          isTeacherCommand = true;
          branch = teacherBranches[index];
        }
      } catch (e) {
        log(c.red('Error accessing teacher examples.'));
        return;
      }
    }
  }

  if (index < 0 && !isTeacherCommand) {
    if (command === 'dev') { createServer('dev'); return; }
    if (command === 'preview') { createServer('preview'); return; }
    log(c.red(c.bold('No such command: ' + command)));
    return;
  }

  // Use appropriate repository and token
  const repoUser = isTeacherCommand ? teacherUser : 'ironboy';
  const repoName = isTeacherCommand ? teacherRepo : 'react-rapide';
  const authToken = isTeacherCommand ? teacherToken : null;

  if (!isTeacherCommand) {
    branch = commandBranches[index];
  }

  log(c.green(c.bold('REACT RAPIDE: ' + command)));

  await getFolderOfBranchWithAuth(tempDir, repoUser, repoName, branch, authToken);

  // ... rest of existing runCommand logic (postDo, folder copying, etc.) remains the same ...

  let baseDir = dirname.slice(0, dirname.lastIndexOf('node_modules'));
  while (baseDir.endsWith('/') || baseDir.endsWith('\\')) { baseDir = baseDir.slice(0, -1); }
  let remoteBaseDir = path.join(tempDir, (isTeacherCommand ? teacherRepo : 'react-rapide') + '-' + branch);

  // Continue with existing logic...
  let func = (await import(url.pathToFileURL(path.join(remoteBaseDir, 'z-rapide.js')))).default;
  let result = func() || {};
  let postDo = { ...defaultPostDo, ...result };

  // ... rest of existing runCommand implementation ...
}

// ===== .gitignore (add this line) =====
//# Teacher authentication token
//  .teacher-token;