/* eslint-disable no-template-curly-in-string */
interface SemanticReleaseConfig {
  isMonorepo?: boolean;
  publishToNpm?: boolean;
  branches?: Array<string>;
}

export default function semanticRelease({
  isMonorepo = false,
  publishToNpm = false,
  branches = ['main'],
}: SemanticReleaseConfig) {
  const npmPlugin = ['@semantic-release/npm', { npmPublish: true }];
  const githubPlugin = '@semantic-release/github';
  const gitPlugin = [
    '@semantic-release/git',
    {
      assets: ['package.json'],
      message:
        'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    },
  ];

  const plugins: Array<any> = [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
  ];

  plugins.push(gitPlugin);
  if (publishToNpm) plugins.push(npmPlugin);
  plugins.push(githubPlugin);

  return {
    branches,
    extends: isMonorepo ? ['semantic-release-monorepo'] : [],
    plugins,
  };
}
