const { eslint } = require('./.dist/index.cjs');

module.exports = {
  ...eslint({ enableTypescript: true }),
};
