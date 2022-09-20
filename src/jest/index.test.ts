import jest from './index';

describe('jest', () => {
  it('should only return the root config if it is passed isMonorepoRoot', () => {
    const result = jest({ isMonorepoRoot: true });
    expect(result).toHaveProperty('projects');
  });

  it('should return a config without the projects property if its not the monorepo root', () => {
    const result = jest({});
    expect(result).not.toHaveProperty('projects');
  });

  it('should return directory configurations if provided a package name and a namespace', () => {
    const pkg = 'jest-tests';

    const result = jest({ packageName: pkg, namespace: '@testing' });
    expect(result?.rootDir).toEqual('../../');
    expect(result?.roots).toContain(`./packages/${pkg}`);
    expect(result?.testRegex).toEqual(`./packages/${pkg}/*.{tsx,ts,js,jsx}`);
  });

  it('should not return directory configurations if its not a monorepo', () => {
    const result = jest({});
    expect(result?.rootDir).toBeUndefined();
    expect(result?.roots).toBeUndefined();
    expect(result?.testRegex).toBeUndefined();
  });

  it('should set the testEnvironment to node if isNode is set', () => {
    const result = jest({ isNode: true });
    expect(result?.testEnvironment).toEqual('node');
  });

  it('should set the testEnvironment to jsdom if isNode is not set', () => {
    const result = jest({ isNode: false });
    expect(result?.testEnvironment).toEqual('jsdom');
  });

  it('should include a transformer if typescript is defined', () => {
    const tsconfig = './some-path.json';
    const result = jest({ tsconfig });
    expect(result?.transform?.['\\.tsx?$'][1]).toEqual({ tsconfig });
    expect(result?.transform?.['\\.tsx?$'][0]).toEqual('ts-jest');
  });
});
