const esbuild = require('esbuild');
const fs = require('fs');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

const eslintFiles = fs
  .readdirSync('src/eslint')
  .filter(src => src.endsWith('.ts'))
  .map(i => `./src/eslint/${i}`);

const prettierFiles = fs
  .readdirSync('src/prettier')
  .filter(src => src.endsWith('.ts'))
  .map(i => `./src/prettier/${i}`);

const semanticReleaseFiles = fs
  .readdirSync('src/semantic-release')
  .filter(src => src.endsWith('.ts'))
  .map(i => `./src/semantic-release/${i}`);

// build cjs files
esbuild
  .build({
    entryPoints: [...eslintFiles, ...prettierFiles, ...semanticReleaseFiles],
    outdir: '.dist',
    minify: true,
    sourcemap: true,
    format: 'cjs',
    target: ['esnext'],
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));

// build cjs module
esbuild
  .build({
    entryPoints: ['./src/index.ts'],
    outfile: './.dist/index.cjs.js',
    minify: true,
    sourcemap: true,
    bundle: true,
    format: 'cjs',
    target: ['esnext'],
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));

// build es module
esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outfile: './.dist/index.esm.js',
    bundle: true,
    sourcemap: true,
    minify: true,
    format: 'esm',
    target: ['esnext'],
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
