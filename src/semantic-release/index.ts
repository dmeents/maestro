/* eslint-disable no-template-curly-in-string */

const base = {
  branches: ['main'],
};

const plugins = [
  '@semantic-release/commit-analyzer',
  '@semantic-release/release-notes-generator',
  [
    '@semantic-release/git',
    {
      assets: ['package.json'],
      message:
        'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    },
  ],
  '@semantic-release/github',
];

export default function semanticRelease() {
  return {
    single: {
      local: {
        ...base,
        plugins: [...plugins, ['@semantic-release/npm', { npmPublish: false }]],
      },
      publish: {
        ...base,
        plugins: [...plugins, '@semantic-release/npm'],
      },
    },
    monorepo: {
      local: {
        ...base,
        extends: ['semantic-release-monorepo'],
        plugins: [...plugins, ['@semantic-release/npm', { npmPublish: false }]],
      },
      publish: {
        ...base,
        extends: ['semantic-release-monorepo'],
        plugins: [...plugins, '@semantic-release/npm'],
      },
    },
  };
}
