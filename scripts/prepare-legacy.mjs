import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';

// Keep existing page URLs and assets working during the incremental migration.
const pages = ['about', 'education', 'expertize', 'projects', 'contact'];
await mkdir('public/legacy-scripts', { recursive: true });

for (const page of pages) {
  const source = await readFile(`${page}.html`, 'utf8');
  const html = source
    .replaceAll('./public/', './')
    .replaceAll('./dist/scripts/', './legacy-scripts/')
    .replaceAll('href="index.html"', 'href="/"')
    .replace('</head>', '<link rel="stylesheet" href="./stylesheets/site-ruler.css">\n</head>')
    .replace('</body>', '<script src="./scripts/site-ruler.js" defer></script>\n</body>');
  await writeFile(`public/${page}.html`, html);
}

for (const file of await readdir('dist/scripts')) {
  if (file.endsWith('.js')) {
    await copyFile(`dist/scripts/${file}`, `public/legacy-scripts/${file}`);
  }
}
