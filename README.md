# maestro

![npm](https://img.shields.io/npm/v/@dmeents/maestro?style=flat)
![npm](https://img.shields.io/npm/dw/@dmeents/maestro?style=flat)
[![codecov](https://codecov.io/gh/dmeents/maestro/branch/main/graph/badge.svg?token=VNX7UY2V2R)](https://codecov.io/gh/dmeents/maestro)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/dmeents/maestro/main?style=flat)
![GitHub issues](https://img.shields.io/github/issues/dmeents/maestro?style=flat)
![GitHub](https://img.shields.io/github/license/dmeents/maestro?style=flat)

> This is just _my_ preferred configuration so it will change frequently, might not work for your
> use case, and could be non-standard. You're welcome to use it, but it's not really
> intended as a configuration solution for everyone.

This is a repository for shared project configs like eslint, prettier, etc across my
projects. Got tired of all the boilerplate every time I started a new project, so here we go!

### Install

```bash
yarn add -D @dmeents/maestro
```

### ESLint Configuration

```bash
# dependencies

# for all projects
yarn add -D eslint eslint-config-prettier eslint-plugin-jest eslint-plugin-prettier

# also add for react apps
yarn add -D eslint-plugin-react

# also add for typescript apps
yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

```javascript
// eslint.js

const { eslint } = require('@dmeents/maestro');
module.exports = { ...eslint(options) };
```

```json
// config Options for eslint

{
  // should the eslint config use ts-lint
  "isTypescript": false,
  // should the eslint config include rules for React
  "isReact": false,
  // the location of the root tsConfig file
  "tsConfigRootDir": ''
}
```

### Prettier Configuration

```bash
# Dependencies

# for all projects
yarn add -D prettier
```

```javascript
// prettierrc.js
const { prettier } = require('@dmeents/maestro');
module.exports = { ...prettier() };
```

### Semantic Release Configuration

```bash
# dependencies

# for all projects
yarn add -D semantic-release @semantic-release/git @semantic-release/github @dmeents/semantic-release-yarn @semantic-release/commit-analyzer @semantic-release/release-notes-generator

# for monorepos (in each package add all previous dependencies and this one)
yarn add -D semantic-release-monorepo
```

```javascript
// release.config.js

const { semantic } = require('@dmeents/maestro');
module.exports = { ...semantic(options) };
```

```json
// config options for semantic-release

{
  // should the semantic-release-monorepo plugin be used 
  "isMonorepo": false,
  // should the package be released to npm
  "publishToNpm": false,
  // which branches to run semantic-release command on
  "branches": [ 'main' ]
}
```

### Jest Configuration

```bash
# dependencies

# for all projects
yarn add -D @types/jest jest jest-environment-jsdom jest-junit

# for typescript projects also add
yarn add -D ts-jest
```

```javascript
// jest.config.js

const { jest } = require('@dmeents/maestro');
module.exports = { ...jest(options) }
```

```json
// config options for jest

{
  // what is the name of the package (package.json). Determines labeling in the terminal. 
  "packageName": '',
  // if in a monorepo, what is the name of the package.json in the root directory. Determines labeling in the terminal
  "namespace": '',
  // the location of the tsconfig if this is a typescript project
  "tsconfig": ''
}
```
