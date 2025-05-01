// ironboy 2025 -> autogenerate routes.tsx file from decentralized routes
// written in the form recommended by React Rapide
import fs from 'fs';
import path from 'path';

export default function (srcDir = path.join(import.meta.dirname, 'src')) {
  const filePaths = fs.readdirSync(srcDir, { recursive: true })
    .filter(x => x.endsWith('.tsx') || x.endsWith('.jsx'));
  const content = filePaths
    .map(filePath => ({ filePath, content: fs.readFileSync(path.join(srcDir, filePath), 'utf-8') }));
  const namesAndRoutes = content
    .filter(({ content }) => content.match(/\w{1,}\.route\s*=\s*\{/))
    .map(x => {
      let name = (x.content.match(/\w{1,}\.route\s*=\s*\{/) + '').split('.')[0].trim();
      return { name, route: x.filePath };
    });
  const generated = `// pages/routes
${namesAndRoutes.map(({ name, route }) => `import ${name} from './${route}';`).join('\n')}

export default [
${namesAndRoutes.map(({ name }) => `  ${name}`).join(',\n')}
].map(x => x.route).sort((a, b) => (a.index || 0) - (b.index || 0));
`.trim();

  fs.writeFileSync(path.join(srcDir, 'routes.tsx'), generated, 'utf-8');

}