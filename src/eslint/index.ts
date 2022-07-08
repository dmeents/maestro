const base = {
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  plugins: ['react', 'prettier'],
  rules: {},
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
  enableTypescript: boolean;
}

export default function eslint({ enableTypescript }: Config) {
  const baseConfig = { ...base };

  if (!enableTypescript) return baseConfig;

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
