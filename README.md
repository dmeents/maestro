# maestro

![npm](https://img.shields.io/npm/v/@dmeents/maestro?style=flat)
![npm](https://img.shields.io/npm/dw/@dmeents/maestro?style=flat)
[![codecov](https://codecov.io/gh/dmeents/maestro/branch/main/graph/badge.svg?token=VNX7UY2V2R)](https://codecov.io/gh/dmeents/maestro)
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

---

### TSConfig

```bash
# dependencies
# for all projects
yarn add -D typescript
```

```json
// tsconfig.json
{
  "extends": "node_modules/@dmeents/maestro/.dist/tsconfig/main.json"
}
```

---

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

const {eslint} = require('@dmeents/maestro');
module.exports = {...eslint(options)};
```

| Option          | Required | Default | Description                                      |
|-----------------|----------|---------|--------------------------------------------------|
| isTypescript    | ❌        | false   | should the eslint config use ts-lint             |
| isReact         | ❌        | false   | should the eslint config include rules for React |
| tsConfigRootDir | ❌        | ""      | the location of the root tsConfig file           |

---

### Prettier Configuration

```bash
# Dependencies
# for all projects
yarn add -D prettier
```

```javascript
// prettierrc.js
const {prettier} = require('@dmeents/maestro');
module.exports = {...prettier()};
```

---

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

const {semantic} = require('@dmeents/maestro');
module.exports = {...semantic(options)};
```

| Option       | Required | Default    | Description                                         |
|--------------|----------|------------|-----------------------------------------------------|
| isMonorepo   | ❌        | false      | should the semantic-release-monorepo plugin be used |
| publishToNpm | ❌        | false      | should the package be released to npm               |
| branches     | ❌        | [ 'main' ] | which branches to run semantic-release command on   |

---

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

const {jest} = require('@dmeents/maestro');
module.exports = {...jest(options)}
```

| Option      | Required | Default | Description                                                                                                       |
|-------------|----------|---------|-------------------------------------------------------------------------------------------------------------------|
| packageName | ❌        | ''      | what is the name of the package (package.json). Determines labeling in the terminal.                              |
| namespace   | ❌        | ''      | if in a monorepo, what is the name of the package.json in the root directory. Determines labeling in the terminal |
| tsconfig    | ❌        | ''      | the location of the tsconfig if this is a typescript project                                                      |

---

### GitHub Actions

This package provides a number of github-action job templates that you can use in your pipeline.
They may be very finicky and will require a very specific repo setup to work well.

### test-standard@main

Run automated test suites in a matrix (concurrently). Currently only supports Jest.

```yml
# usage example
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        suite: [ 'jest' ]
    steps:
      - name: Test Package
        uses: dmeents/maestro/src/github-actions/test-standard@main
        with:
          testSuite: ${{ matrix.suite }}
          codeCovSecret: ${{ secrets.CODECOV_TOKEN }}
```

| Option        | Required | Default | Description               |
|---------------|----------|---------|---------------------------|
| testSuite     | ✅        | -       | the test suite to run     |
| nodeVersion   | ❌        | latest  | which node version to use |
| codeCovSecret | ❌        | -       | the secret for codecov    |
| npmToken      | ❌        | -       | the npm token             |

### release-standard@main

Automate release documentation and semantic versioning
using [semantic-release](https://www.npmjs.com/package/semantic-release)
and [@dmeents/semantic-release-yarn](https://www.npmjs.com/package/@dmeents/semantic-release-yarn)

```yml
# usage example
jobs:
  semantic-release:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    strategy:
      fail-fast: false
      max-parallel: 1
      matrix:
        package:
          - monorepo-package-1
          - monorepo-package-2
    steps:
      - uses: actions/checkout@v3
      - name: Get latest code
        run: git pull origin main
      - name: Release @myMonorepo/${{ matrix.package }}
        uses: dmeents/maestro/src/github-actions/release-standard@main
        with:
          namespace: '@myMonorepo'
          packageName: ${{ matrix.package }}
          githubToken: ${{ secrets.GH_TOKEN }}
```

| Option      | Required | Default   | Description                                                        |
|-------------|----------|-----------|--------------------------------------------------------------------|
| packageName | ✅        | -         | the package to build                                               |
| nodeVersion | ❌        | latest    | which node version to use                                          |
| namespace   | ❌        | undefined | the monorepo namespace                                             |
| npmToken    | ✅        | -         | the npm token, used to publish packages                            |
| githubToken | ✅        | -         | the github token required to push `package.json` changes to github |

### deploy-terraform@main

Manage deploying with terraform using a remote backend.

```yml
# usage example
jobs:
  deploy-dev:
    runs-on: ubuntu-latest
    needs: [ build-docker ]
    if: github.ref == 'refs/heads/main'
    strategy:
      fail-fast: false
      matrix:
        package:
          - monorepo-package-1
          - monorepo-package-2
    steps:
      - uses: actions/checkout@v3
      - name: Set environment config file for terraform
        shell: bash
        run: |
          # put tfvars in a github secret, then read and write them to a .env file
          if [ ${{ matrix.package }} = "monorepo-package-1" ]; then 
            printf '${{ secrets.TFVARS_DEVELOPMENT_API }}' > ./packages/monorepo-package-1/architecture/env.development.tfvars
          fi

          if [ ${{ matrix.package }} = "monorepo-package-2" ]; then
            printf '${{ secrets.TFVARS_DEVELOPMENT_WEB }}' > ./packages/monorepo-package-2/architecture/env.development.tfvars
          fi

      - name: Set package version
        shell: bash
        run: |
          # get the package version
          PKG_VERSION=$(cat ./packages/${{ matrix.package }}/package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]')
          echo packageVersion=$PKG_VERSION >> $GITHUB_ENV
      - name: Deploy ${{ matrix.package }} to development
        uses: dmeents/maestro/src/github-actions/deploy-terraform@main
        with:
          environment: development
          githubToken: ${{ secrets.GITHUB_TOKEN }}
          terraformConfigPath: ./packages/${{ matrix.package }}/architecture
          backendAccessKey: ${{ secrets.BACKEND_ACCESS_KEY }}
          backendSecretKey: ${{ secrets.BACKEND_SECRET_KEY }}
          backendKey: architecture/${{ matrix.package }}/development/terraform.tfstate
          containerImage: registry.digitalocean.com/myMonorepo/${{ matrix.package }}:${{ env.packageVersion }}
```

| Option              | Required | Default | Description                                    |
|---------------------|----------|---------|------------------------------------------------|
| environment         | ✅        | -       | the environment to deploy to                   |
| githubToken         | ✅        | -       | the github token                               |
| terraformConfigPath | ✅        | -       | the path to the terraform config files         |
| backendAccessKey    | ✅        | -       | the backend-config access key to use           |
| backendSecretKey    | ✅        | -       | the backend-config secret key to use           |
| backendKey          | ✅        | -       | the bucket name of the remote terraform config |
| containerImage      | ✅        | -       | the docker image to deploy                     |

### build-docker@main

Build your docker images for your project, or mono repo packages concurrently. Only supports DigitalOcean registries
right now.

```yml
# usage example
jobs:
  build-docker:
    runs-on: ubuntu-latest
    needs: [ build-code, test ]
    if: github.ref == 'refs/heads/main'
    strategy:
      fail-fast: false
      matrix:
        package:
          - monorepo-package-1
          - monorepo-package-2
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker @myMonorepo/${{ matrix.package }}
        uses: dmeents/maestro/src/github-actions/build-docker@main
        with:
          namespace: '@myMonorepo'
          packageName: ${{ matrix.package }}
          dockerFile: "./packages/${{ matrix.package }}/Dockerfile"
          digitaloceanSecret: ${{ secrets.DIGITALOCEAN_SECRET }}
          digitaloceanRegistry: "registry.digitalocean.com/myMonorepo"
```

| Option               | Required | Default   | Description                             |
|----------------------|----------|-----------|-----------------------------------------|
| packageName          | ✅        | -         | the package to build                    |
| nodeVersion          | ❌        | latest    | which node version to use               |
| namespace            | ❌        | undefined | the monorepo namespace                  |
| dockerfile           | ✅        | -         | the location and name of the dockerfile |
| digitaloceanSecret   | ✅        | -         | the secret for digital ocean            |
| digitaloceanRegistry | ✅        | -         | the name of the registry to use         |
