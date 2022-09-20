import prettier from './index';

describe('prettier', () => {
  it('should return a prettier config object', () => {
    const result = prettier();
    expect(result).toBeInstanceOf(Object);
  });
});
