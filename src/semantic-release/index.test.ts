import semanticRelease from './index';

describe('semantic release', () => {
  it('should extend semantic-release-monorepo if set as monorepo', () => {
    const result = semanticRelease({ isMonorepo: true });
    expect(result.extends).toContain('semantic-release-monorepo');
  });

  it('should extend nothing if not a monorepo', () => {
    const result = semanticRelease({ isMonorepo: false });
    expect(result.extends).toEqual([]);
  });

  it('should be marked as npmPublish if defined in config', () => {
    const result = semanticRelease({ publishToNpm: true });

    const yarnPlugin = result.plugins.find(
      i => Array.isArray(i) && i[0] === '@suin/semantic-release-yarn',
    );

    expect(yarnPlugin?.[1]).toEqual({ npmPublish: true });
  });

  it('should use provided branches if defined', () => {
    const testBranches = ['master', 'dev'];
    const result = semanticRelease({ branches: testBranches });
    expect(result.branches).toEqual(testBranches);
  });
});
