import { isValidKnightMove } from '../validators/knightValidator';

describe('Knight Validator', () => {
  test('valid knight L-shaped moves', () => {
    expect(isValidKnightMove(4, 4, 2, 5)).toBe(true);
    expect(isValidKnightMove(4, 4, 2, 3)).toBe(true);
    expect(isValidKnightMove(4, 4, 6, 5)).toBe(true);
    expect(isValidKnightMove(4, 4, 6, 3)).toBe(true);
  });
  
  test('invalid non-L-shaped moves', () => {
    expect(isValidKnightMove(4, 4, 4, 4)).toBe(false);
    expect(isValidKnightMove(4, 4, 5, 5)).toBe(false);
    expect(isValidKnightMove(4, 4, 4, 6)).toBe(false);
  });
});
