# maestro

![npm](https://img.shields.io/npm/v/@dmeents/maestro?style=flat-square)
![npm](https://img.shields.io/npm/dw/@dmeents/maestro?style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/dmeents/maestro/main?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/dmeents/maestro?style=flat-square)
![GitHub](https://img.shields.io/github/license/dmeents/maestro?style=flat-square)

> This is just _my_ preferred configuration so it will change frequently, might not work for your
> use case, and could be non-standard. You're welcome to use it, but it's not really
> intended as a configuration solution for the masses.

This is a repository for shared project configs like eslint, prettier, etc across my
projects. Got tired of all the boilerplate every time I started a new project, so here we go!

### Install

```bash
npm install --dev @dmeents/maestro
yarn add --dev @dmeents/maestro
```

### Usage - .js files

```javascript
// .eslintrc.js
const { eslint } = require('@dmeents/maestro');

// linting for typescript projects
module.exports = { ...eslint({ enableTypescript: true }) };

// linting for javascript projects
module.exports = { ...eslint() }; 
```

```javascript
// prettierrc.js
const { prettier } = require('@dmeents/maestro');
module.exports = { ...prettier() };
```

```javascript
// release.config.js
const { semantic } = require('@dmeents/maestro');
module.exports = { ...semantic({ isMonorepo: true, publishToNpm: true }) };
```