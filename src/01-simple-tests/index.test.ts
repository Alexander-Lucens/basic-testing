// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({
      a: 44444,
      b: 33333,
      action: Action.Add,
    });
    expect(result).toBe(77777);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({
      a: 44444,
      b: 33333,
      action: Action.Subtract,
    });
    expect(result).toBe(11111);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({
      a: 23,
      b: 11,
      action: Action.Multiply,
    });
    expect(result).toBe(253);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({
      a: 44444,
      b: 11111,
      action: Action.Divide,
    });
    expect(result).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 11,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(1331);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 44444,
      b: 33333,
      action: '%',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: '14',
      b: 12,
      action: Action.Add,
    });
    expect(result).toBeNull();
  });
});
