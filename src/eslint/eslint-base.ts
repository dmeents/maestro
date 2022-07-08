export = {
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  rules: {
    'class-methods-use-this': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'max-len': ['error', { code: 110 }],
    'array-element-newline': [
      'error',
      { ArrayExpression: 'consistent', ArrayPattern: { minItems: 100 } },
    ],
  },
  settings: {
    'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] } },
  },
};
