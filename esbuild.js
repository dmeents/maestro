const esbuild = require('esbuild');
const fs = require('fs');

const eslintFiles = fs
  .readdirSync('src/eslint')
  .filter(src => src.endsWith('.ts'))
  .map(i => `./src/eslint/${i}`);

const prettierFiles = fs
  .readdirSync('src/prettier')
  .filter(src => src.endsWith('.ts'))
  .map(i => `./src/prettier/${i}`);

// make directories
fs.mkdirSync('./.dist/');
fs.mkdirSync('./.dist/typescript/');

// copy tsconfig files
fs.readdirSync('src/typescript')
  .filter(src => src.endsWith('.json'))
  .map(i =>
    fs.copyFileSync(`./src/typescript/${i}`, `./.dist/typescript/${i}`),
  );

// build cjs files
esbuild
  .build({
    entryPoints: [...eslintFiles, ...prettierFiles],
    outdir: '.dist',
    minify: true,
    format: 'cjs',
    target: ['esnext'],
  })
  .catch(() => process.exit(1));

// build cjs module
esbuild
  .build({
    entryPoints: ['./src/index.ts'],
    outfile: './.dist/index.cjs.js',
    minify: true,
    bundle: true,
    format: 'cjs',
    target: ['esnext'],
  })
  .catch(() => process.exit(1));

// build es module
esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outfile: './.dist/index.es.js',
    bundle: true,
    minify: true,
    format: 'esm',
    target: ['esnext'],
  })
  .catch(() => process.exit(1));
