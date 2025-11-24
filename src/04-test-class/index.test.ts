// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 10017;
    const client = getBankAccount(balance);
    expect(client.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 10;
    const client = getBankAccount(balance);
    const errorToBe = new InsufficientFundsError(balance);
    const msgErrorToBe = `Insufficient funds: cannot withdraw more than ${balance}`;
    expect(() => client.withdraw(17)).toThrow(errorToBe);
    expect(() => client.withdraw(17)).toThrow(msgErrorToBe);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 10;
    const client = getBankAccount(balance);
    const reciever = getBankAccount(123);
    const errorToBe = new InsufficientFundsError(balance);
    const msgErrorToBe = `Insufficient funds: cannot withdraw more than ${balance}`;
    expect(() => client.transfer(17, reciever)).toThrow(errorToBe);
    expect(() => client.transfer(17, reciever)).toThrow(msgErrorToBe);
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 10;
    const client = getBankAccount(balance);
    const errorToBe = new TransferFailedError();
    expect(() => client.transfer(17, client)).toThrow(errorToBe);
    expect(() => client.transfer(17, client)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const balance = 10;
    const add = 19;
    const client = getBankAccount(balance);
    expect(client.deposit(add).getBalance()).toBe(balance + add);
  });

  test('should withdraw money', () => {
    const balance = 100;
    const getVal = 19;
    const client = getBankAccount(balance);
    expect(client.withdraw(getVal).getBalance()).toBe(balance - getVal);
  });

  test('should transfer money', () => {
    const balance = 100;
    const getVal = 19;
    const client = getBankAccount(balance);
    const recipient = getBankAccount(balance);
    client.transfer(getVal, recipient);
    expect(client.getBalance()).toBe(balance - getVal);
    expect(recipient.getBalance()).toBe(balance + getVal);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 100;
    const client = getBankAccount(balance);
    const result = await client.fetchBalance();
    expect(result === null || typeof result === 'number').toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const client = getBankAccount(0);
    const value = 1357;
    client.fetchBalance = jest.fn().mockResolvedValue(value);
    await client.synchronizeBalance();
    expect(client.getBalance()).toBe(value);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const client = getBankAccount(0);
    client.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(client.synchronizeBalance()).rejects.toBeInstanceOf(
      SynchronizationFailedError,
    );
  });

  // for both of possibilities
  test('run synchronizeBalance in original way without reMock-ing fetchBalance', async () => {
    const client = getBankAccount(0);
    try {
      await client.synchronizeBalance();
      expect(typeof client.getBalance()).toBe('number');
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
