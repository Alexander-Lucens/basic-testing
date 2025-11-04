// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((fn) => fn),
}));
describe('throttledGetDataFromApi', () => {
  const mockGet = jest.fn();

  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });
    mockGet.mockReset();
  });

  test('should create instance with provided base url', async () => {
    mockGet.mockResolvedValue({ data: { foo: 'bar' } });
    await throttledGetDataFromApi('/todos/1');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockGet.mockResolvedValue({ data: { foo: 'bar' } });
    const path = '/todos/1';
    await throttledGetDataFromApi(path);

    expect(mockGet).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const responseData = { id: 1, title: 'Test' };
    mockGet.mockResolvedValue({ data: responseData });
    const result = await throttledGetDataFromApi('/todos/1');
    expect(result).toEqual(responseData);
  });
});
