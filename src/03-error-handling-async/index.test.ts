// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const msgCustom = 'This is my awesome custom error!';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const numVal = 123;
    await expect(resolveValue(numVal)).resolves.toBe(numVal);

    const textVal = 'Some text value';
    await expect(resolveValue(textVal)).resolves.toBe(textVal);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('provided message')).toThrow('provided message');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
    expect(() => throwCustomError()).toThrow(msgCustom);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
    await expect(rejectCustomError()).rejects.toThrow(msgCustom);
  });
});
