# maestro

### Orchestrating all configuration files

> This is just _my_ preferred configuration so it will change frequently, might not work for your
> use case, and could be non-standard. You're welcome to use it, but it's not really
> intended as a configuration solution for the masses.

This is a repository for shared project configs like eslint, typescript, prettier, etc across my
projects. Got tired of all the boilerplate every time I started a new project, so here we go!

### Install

```bash
npm install @dmeents/maestro
```

### Usage

```javascript
// .eslintrc.js
const { eslint } = require('@dmeents/maestro');
module.exports = { ...eslint({ enableTypescript: true }) }; // eslint with typescript support

// module.exports = { ...eslint() }; // without typescript support
```

```javascript
// prettierrc.js
const { prettier } = require('@dmeents/maestro');
module.exports = { ...prettier().base };
```

```javascript
// release.config.js
const { semantic } = require('./.dist/index.cjs');
module.exports = { ...semantic().single.publish };
```

```json
// tsconfig.json
// TODO: verify this works 😂
{
  "extends": "@dmeents/maestro/typescript/tsconfig-base.json"
  // ... other options here
}
```
