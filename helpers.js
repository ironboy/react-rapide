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
  return branches.filter(filter);
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
  console.log(url);
  const data = Buffer.from(await (await fetch(url)).arrayBuffer());
  //  fs.writeFileSync(filePath, Buffer.from(data));
  new AdmZip(data).extractAllTo(folderPath, true);
}