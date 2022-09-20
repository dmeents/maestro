import { ParserOptions } from '@typescript-eslint/parser';

const base = (isReact: boolean) => ({
  extends: [
    'eslint:recommended',
    isReact ? 'plugin:react/recommended' : '',
    'plugin:jest/recommended',
    'prettier',
  ],
  plugins: ['jest', 'prettier'],
  rules: {},
  env: {
    'node': true,
    'jest/globals': true,
  },
});

const typescript = (tsconfigRootDir: string, isReact: boolean) => ({
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    isReact ? 'plugin:react/recommended' : '',
    'plugin:jest/recommended',
    'prettier',
  ],
  plugins: [...base(isReact).plugins, '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir,
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  rules: {
    ...base(isReact).rules,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
  env: { ...base(isReact).env },
});

interface EslintConfig {
  isTypescript?: boolean;
  isReact?: boolean;
  tsConfigRootDir?: string;
}

interface EslintReturnConfig {
  extends: Array<string>;
  plugins: Array<string>;
  parser?: string;
  parserOptions?: ParserOptions;
  rules: { [key: string]: any };
  env: { [key: string]: any };
}

export default function eslint({
  isTypescript = false,
  isReact = false,
  tsConfigRootDir = '.',
}: EslintConfig): EslintReturnConfig {
  return isTypescript ? typescript(tsConfigRootDir, isReact) : base(isReact);
}
