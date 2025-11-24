// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

const mockedExistsSync = existsSync as jest.Mock;
const mockedReadFile = readFile as jest.Mock;
const mockedJoin = join as jest.Mock;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1500;
    doStuffByTimeout(callback, timeout);

    expect(jest.getTimerCount()).toBe(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 2025;
    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 500;
    doStuffByInterval(callback, interval);

    expect(jest.getTimerCount()).toBe(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 500;
    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(interval * 2);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    mockedExistsSync.mockClear();
    mockedReadFile.mockClear();
    mockedJoin.mockClear();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    const fakeFullPath = '/nothing/test.txt';

    mockedJoin.mockReturnValueOnce(fakeFullPath);
    mockedExistsSync.mockReturnValueOnce(false);

    await readFileAsynchronously(pathToFile);

    expect(mockedJoin).toHaveBeenCalledTimes(1);
    expect(mockedJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'non-existent.txt';
    const fakeFullPath = '/nothing/non-existent.txt';
    mockedJoin.mockReturnValue(fakeFullPath);
    mockedExistsSync.mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(mockedExistsSync).toHaveBeenCalledWith(fakeFullPath);
    expect(mockedReadFile).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'test.txt';
    const fakeFullPath = '/nothing/test.txt';
    const fileContent = 'Hello Jest';
    const fileBuffer = Buffer.from(fileContent);

    mockedJoin.mockReturnValue(fakeFullPath);
    mockedExistsSync.mockReturnValue(true);
    mockedReadFile.mockResolvedValue(fileBuffer);

    const result = await readFileAsynchronously(pathToFile);

    expect(mockedExistsSync).toHaveBeenCalledWith(fakeFullPath);
    expect(mockedReadFile).toHaveBeenCalledWith(fakeFullPath);
    expect(result).toBe(fileContent);
  });
});
