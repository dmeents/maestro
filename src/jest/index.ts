const baseConfig = (
  packageName: string,
  namespace?: string,
  tsconfig?: string,
) => {
  const config: any = {
    cacheDirectory: '.jest-cache',
    id: packageName,
    displayName: packageName,
    reporters: ['default', 'jest-junit'],
    transformIgnorePatterns: [
      '<rootDir>/node_modules/',
      'dist',
      'setupTests.js',
    ],
    collectCoverageFrom: ['<rootDir>/packages/*/src/**/*.{ts,tsx,js,jsx}'],
    coverageDirectory: '<rootDir>/coverage/',
    coveragePathIgnorePatterns: [
      'node_modules',
      '.stories.{tsx,ts,js,jsx}',
      '.d.ts',
      '.dao.ts',
      '.dist/',
      '.dto.ts',
      '.interface.ts',
      '.lib/',
      '.schema.{ts,js}',
      '.styles.{ts,js}',
    ],
  };

  if (namespace) {
    config.moduleNameWrapper = {
      [`^@${namespace}/(.*)$`]: '<rootDir>/packages/$1',
    };
  }

  if (tsconfig) {
    config.globals['ts-jest'] = { tsconfig };
    config.preset = 'ts-jest/presets/js-with-ts';
  }

  return config;
};

const directoryConfigs = (packageName: string, namespace?: string) => {
  if (namespace) {
    return {
      rootDir: '../../',
      roots: [`<rootDir>/packages/${packageName}`],
      testRegex: `(<rootDir>packages/${packageName}/.*/__tests__/.*|\\.(test|spec))\\.{tsx,ts,js,jsx}?$`,
    };
  }

  return {
    rootDir: '.',
    roots: [`<rootDir>`],
    testRegex: `(<rootDir>/.*/__tests__/.*|\\.(test|spec))\\.{tsx,ts,js,jsx}?$`,
  };
};

const rootConfig = (namespace?: string) => {
  if (namespace) {
    return { projects: ['<rootDir>/packages/*/jest.config.js'] };
  }

  return {};
};

interface JestConfig {
  packageName: string;
  isRoot?: boolean;
  isNode?: boolean;
  namespace?: string;
  tsconfig?: string;
}

export default function jest({
  isRoot = false,
  packageName,
  namespace,
  tsconfig,
  isNode,
}: JestConfig) {
  if (isRoot) return rootConfig(namespace);

  return {
    ...baseConfig(packageName, namespace, tsconfig),
    ...directoryConfigs(packageName, namespace),
    testEnvironment: isNode ? 'node' : 'jsdom',
  };
}
