// Uncomment the code below and write your tests
import * as mockModule from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual('./index');
  return originalModule;
});

describe('partial mocking', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    jest.spyOn(mockModule, 'mockOne').mockImplementation(() => {});
    jest.spyOn(mockModule, 'mockTwo').mockImplementation(() => {});
    jest.spyOn(mockModule, 'mockThree').mockImplementation(() => {});

    mockModule.mockOne();
    mockModule.mockTwo();
    mockModule.mockThree();

    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    mockModule.unmockedFunction();
    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
