const base = {
  extends: ['airbnb', 'prettier'],
  plugins: ['react', 'prettier'],
  rules: {
    'import/prefer-default-export': 0,
    'no-plusplus': 0,
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

const typescript = {
  extends: [...base.extends, 'airbnb-typescript'],
  plugins: [...base.plugins, '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  rules: { ...base.rules },
  settings: { ...base.settings },
};

interface EslintConfig {
  isTypescript?: boolean;
}

export default function eslint({ isTypescript = false }: EslintConfig) {
  if (isTypescript) return typescript;
  return base;
}
