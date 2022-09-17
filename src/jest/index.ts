const baseConfig = (
  packageName?: string,
  namespace?: string,
  tsconfig?: string,
  isRoot?: boolean,
) => {
  if (isRoot) return {};

  const config: any = {
    cacheDirectory: '.jest-cache',
    id: packageName,
    displayName: packageName,
    reporters: ['default', 'jest-junit'],
    transformIgnorePatterns: [
      '<rootDir>/node_modules/',
      '.dist',
      'setupTests.js',
    ],
    collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
    coverageDirectory: '<rootDir>/coverage/',
  };

  if (namespace) {
    config.moduleNameMapper = { [`^@${namespace}/(.*)$`]: './packages/$1' };
  }

  if (tsconfig) {
    config.transform = {
      '\\.tsx?$': ['ts-jest', { tsconfig }],
    };
  }

  return config;
};

const directoryConfigs = (packageName?: string, namespace?: string) => {
  if (namespace && packageName) {
    return {
      rootDir: '../../',
      roots: [`./packages/${packageName}`],
      testRegex: `./packages/${packageName}/*.{tsx,ts,js,jsx}`,
    };
  }

  return {};
};

const rootConfig = (isRoot: boolean, namespace?: string) => {
  if (namespace && isRoot) {
    return { projects: ['./packages/*/jest.config.js'] };
  }

  return {};
};

interface JestConfig {
  // the name of the package to test
  packageName?: string;
  // is this the root config (in a monorepo)
  isRoot?: boolean;
  // should this run in an node or jsdom environment
  isNode?: boolean;
  // the namespace of the monorepo (determines if this config is for monorepos)
  namespace?: string;
  // the path to the tsconfig (only for typescript)
  tsconfig?: string;
}

export default function jest({
  isRoot = false,
  packageName,
  namespace,
  tsconfig,
  isNode,
}: JestConfig) {
  return {
    ...rootConfig(isRoot, namespace),
    ...baseConfig(packageName, namespace, tsconfig),
    ...directoryConfigs(packageName, namespace),
    testEnvironment: isNode ? 'node' : 'jsdom',
  };
}
