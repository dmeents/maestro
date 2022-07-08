module.exports = {
  extends: ["airbnb-typescript"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    createDefaultProgram: true,
  },
  rules: {
    "@typescript-eslint/naming-convention": 0,
    "@typescript-eslint/no-redeclare": 0,
  },
};
