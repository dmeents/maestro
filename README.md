# maestro

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
module.exports = { ...prettier().base };
```

```javascript
// release.config.js
const { semantic } = require('@dmeents/maestro');

// for single repositories and if you want to publish the dist to npm, use this 
module.exports = { ...semantic().single.publish };

// for monorepo repositories and if you don't want to publish, use this
module.exports = { ...semantic().monorepo.local };

// these can be used in any combination
module.exports = { ...semantic().single.local };
module.exports = { ...semantic().monorepo.publish };
```