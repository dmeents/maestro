import eslintConfig from './index';

describe('eslint', () => {
  it('should return typescript config when passed isTypescript', () => {
    const result = eslintConfig({ isTypescript: true });
    expect(result?.parser).toEqual('@typescript-eslint/parser');
    expect(result?.parserOptions?.project).toEqual('./tsconfig.json');
    expect(result?.parserOptions?.createDefaultProgram).toEqual(true);
  });

  it('should include the tsconfigRootDir as a parser option if it is set', () => {
    const result = eslintConfig({
      isTypescript: true,
      tsConfigRootDir: './foobar',
    });

    expect(result?.parserOptions?.tsconfigRootDir).toEqual('./foobar');
  });

  it('should return javascript config when not passed isTypescript', () => {
    const result = eslintConfig({});
    expect(result.parser).toBeUndefined();
  });

  it('should include the React plugin if isReact is defined', () => {
    const result = eslintConfig({ isReact: true });
    expect(result.extends).toContain('plugin:react/recommended');
  });
});
