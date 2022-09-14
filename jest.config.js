const { jest } = require('./.dist/index.cjs');

module.exports = {
  ...jest({
    packageName: 'maestro',
    isNode: true,
    tsconfig: 'tsconfig.json',
  }),
};
