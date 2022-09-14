const base = {
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  plugins: ['react', 'prettier'],
  rules: {
    'import/prefer-default-export': 0,
    'no-plusplus': 0,
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
  },
};

const typescript = {
  extends: ['airbnb-typescript'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  rules: {},
};

interface Config {
  isTypescript?: boolean;
}

export default function eslint({ isTypescript = false }: Config) {
  const baseConfig = { ...base };

  if (!isTypescript) return baseConfig;

  const {
    extends: tsExtends,
    rules: tsRules,
    plugins: tsPlugins,
    ...other
  } = typescript;

  return {
    ...other,
    extends: [...baseConfig.extends, ...tsExtends],
    plugins: [...baseConfig.plugins, ...tsPlugins],
    rules: { ...baseConfig.rules, ...tsRules },
  };
}
