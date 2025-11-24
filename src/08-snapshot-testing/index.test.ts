// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

type LinkedListNode<T> = {
  value: T | null;
  next: LinkedListNode<T> | null;
};

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3];
    const list = generateLinkedList(elements);
    const expected: LinkedListNode<number> = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(list).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = ['a', 'b', 'c', { id: 1 }];
    const list = generateLinkedList(elements);
    expect(list).toMatchSnapshot();
  });
});
