const base = (isReact: boolean) => ({
  extends: [
    'eslint:recommended',
    isReact ? 'plugin:react/recommended' : '',
    'prettier',
  ],
  plugins: ['prettier'],
  rules: {},
});

const typescript = (tsconfigRootDir: string, isReact: boolean) => ({
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    isReact ? 'plugin:react/recommended' : '',
    'prettier',
  ],
  plugins: [...base(isReact).plugins, '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir,
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  rules: { ...base(isReact).rules },
});

interface EslintConfig {
  isTypescript?: boolean;
  isReact?: boolean;
  tsConfigRootDir?: string;
}

export default function eslint({
  isTypescript = false,
  isReact = false,
  tsConfigRootDir = '.',
}: EslintConfig) {
  return isTypescript ? typescript(tsConfigRootDir, isReact) : base(isReact);
}
