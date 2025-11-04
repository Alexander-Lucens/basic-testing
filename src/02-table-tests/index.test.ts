// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

type TestCase = {
  a: unknown;
  b: unknown;
  action: unknown;
  expected: number | null;
};

const testCases: TestCase[] = [
  { a: 123, b: 321, action: Action.Add, expected: 444 },
  { a: 444, b: 2, action: Action.Divide, expected: 222 },
  { a: 33, b: 7, action: Action.Subtract, expected: 26 },
  { a: 17, b: 3, action: Action.Multiply, expected: 51 },
  { a: 11, b: 3, action: Action.Exponentiate, expected: 1331 },
  { a: '14', b: 12, action: Action.Add, expected: null },
  { a: 11, b: 3, action: '%', expected: null },
];

describe('simpleCalculator', () => {
  for (const { a, b, action, expected } of testCases) {
    test(`should return ${expected} for a=${String(a)}, b=${String(b)}, action=${String(action)}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  }
});
