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
  return {
    branches,
    extends: isMonorepo ? ['semantic-release-monorepo'] : [],
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      ['@dmeents/semantic-release-yarn', { npmPublish: publishToNpm }],
      [
        '@semantic-release/git',
        {
          assets: ['package.json', 'dist/**/*'],
          message:
            'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        },
      ],
      ['@semantic-release/github', { assets: './*.tgz' }],
    ],
  };
}
