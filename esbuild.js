const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

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
    treeShaking: true,
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
    treeShaking: true,
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
