const eslintBase = require("./eslint/eslint-base.js");
const eslintTs = require("./eslint/eslint-ts.js");
const prettierBase = require("./prettier/prettier-base");
const tsApi = require("./typescript/tsconfig-api.json");
const tsBase = require("./typescript/tsconfig-base.json");
const tsWeb = require("./typescript/tsconfig-web.json");

module.exports = {
  eslintBase,
  eslintTs,
  prettierBase,
  tsApi,
  tsBase,
  tsWeb,
};
