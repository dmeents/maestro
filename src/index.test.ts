// @ts-ignore
import * as Maestro from './index';

describe('Maestro', () => {
  it('should have exports', () => {
    expect(typeof Maestro).toBe('object');
  });

  it('should not have undefined exports', () => {
    Object.keys(Maestro).forEach(i => expect(Boolean(Maestro[i])).toBe(true));
  });
});
