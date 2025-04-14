import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import AdmZip from 'adm-zip';

export async function getBranches(gitHubUser, repository, filter = () => true) {
  const url = `https://github.com/${gitHubUser}/${repository}/branches/all`;
  const html = await (await fetch(url)).text();
  const $ = cheerio.load(html);
  const branches = [];
  $('div[title]').each(function () {
    branches.push($(this).text());
  });
  return branches.filter(filter).sort();
}

export async function getReadMeOfBranch(gitHubUser, repository, branch, shortenTo = Infinity) {
  let variants = ['README.md', 'Readme.md', 'readme.md'];
  const url = `https://raw.githubusercontent.com/${gitHubUser}/${repository}/refs/heads/${branch}/`;
  let text = '';
  for (let variant of variants) {
    const response = await fetch(url + variant).catch(_e => { });
    if (response.status === 200) { text = (await response.text()).slice(0, shortenTo); break; }
  }
  return text;
}

export async function getFolderOfBranch(folderPath, gitHubUser, repository, branch) {
  const url = `https://github.com/${gitHubUser}/${repository}`
    + `/archive/${branch}.zip`;
  try {
    //while (true) {
    const data = Buffer.from(await (await fetch(url)).arrayBuffer());
    let fileName = repository + '-' + branch;
    let moveTo = path.join(folderPath, fileName);
    fs.existsSync(fileName) && fs.rmSync(fileName, { recursive: true, force: true });
    fs.existsSync(moveTo) && fs.rmSync(moveTo, { recursive: true, force: true });
    // AdmZip can not extract psf:// file paths in Windows - so we work arouind it...
    // IFFY SOLUTION FOR psf - remove
    /*new AdmZip(data).extractAllTo('./node_modules/', true);
    try {
      fs.renameSync('./node_modules/' + fileName, moveTo);
      break;
    }
    catch (_e) { await sleep(3000); }*/
    console.log(moveTo);
    new AdmZip(data).extractAllTo(moveTo, true);
    consolelog('men', fs.existsSync(moveTo));
    //}
  }
  catch (_e) { console.log(_e); return false; }
  return true;
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}