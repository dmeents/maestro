import eslintConfig from './index';

describe('eslint', () => {
  it('should not fail', () => {
    const result = eslintConfig({});
    expect(result).not.toBeNull();
  });
});
