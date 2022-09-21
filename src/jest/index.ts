import type { Config as JestConfig } from '@jest/types';

const baseConfig = (
  packageName?: string,
  namespace?: string,
  tsconfig?: string,
) => {
  const config: JestConfig.InitialOptions = {
    cacheDirectory: '.jest-cache',
    id: packageName,
    displayName: packageName,
    reporters: ['default', 'jest-junit'],
    modulePathIgnorePatterns: ['.dist'],
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

interface JestParamConfig {
  // the name of the package to test
  packageName?: string;
  // is this the root config (in a monorepo)
  isMonorepoRoot?: boolean;
  // should this run in an node or jsdom environment
  isNode?: boolean;
  // the namespace of the monorepo (determines if this config is for monorepos)
  namespace?: string;
  // the path to the tsconfig (only for typescript)
  tsconfig?: string;
}

/**
 * returns a jest config
 */
export default function jest({
  isMonorepoRoot = false,
  packageName,
  namespace,
  tsconfig,
  isNode,
}: JestParamConfig): JestConfig.InitialOptions {
  if (isMonorepoRoot) return { projects: ['./packages/*/jest.config.js'] };

  return {
    ...baseConfig(packageName, namespace, tsconfig),
    ...directoryConfigs(packageName, namespace),
    testEnvironment: isNode ? 'node' : 'jsdom',
  };
}
