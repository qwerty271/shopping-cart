import { rootReducer } from './rootReducer';
import { increment, decrement, addProduct, deleteProduct } from './actions';

test('should return the initial state', () => {
  expect(rootReducer(undefined, {})).toEqual({
    storage: [
      { id: 1, name: 'Товар-1', price: 100, quantity: 1 },
      { id: 2, name: 'Товар-2', price: 200, quantity: 2 },
      { id: 3, name: 'Товар-3', price: 300, quantity: 3 },
      { id: 4, name: 'Товар-4', price: 400, quantity: 4 },
      { id: 5, name: 'Товар-5', price: 500, quantity: 5 },
    ],
  });
});

test('should handle a function increment', () => {
  expect(rootReducer(undefined, increment(1))).toEqual({
    storage: [
      { id: 1, name: 'Товар-1', price: 100, quantity: 2 },
      { id: 2, name: 'Товар-2', price: 200, quantity: 2 },
      { id: 3, name: 'Товар-3', price: 300, quantity: 3 },
      { id: 4, name: 'Товар-4', price: 400, quantity: 4 },
      { id: 5, name: 'Товар-5', price: 500, quantity: 5 },
    ],
  });
});

test('should handle a function decrement', () => {
  expect(rootReducer(undefined, decrement(5))).toEqual({
    storage: [
      { id: 1, name: 'Товар-1', price: 100, quantity: 1 },
      { id: 2, name: 'Товар-2', price: 200, quantity: 2 },
      { id: 3, name: 'Товар-3', price: 300, quantity: 3 },
      { id: 4, name: 'Товар-4', price: 400, quantity: 4 },
      { id: 5, name: 'Товар-5', price: 500, quantity: 4 },
    ],
  });
});

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

test('should handle a function addProduct', () => {
  expect(rootReducer(undefined, addProduct('new product', 500, 5))).toEqual({
    storage: [
      {
        id: expect.toBeWithinRange(0, 1),
        name: 'new product',
        price: 500,
        quantity: 5,
      },
      { id: 1, name: 'Товар-1', price: 100, quantity: 1 },
      { id: 2, name: 'Товар-2', price: 200, quantity: 2 },
      { id: 3, name: 'Товар-3', price: 300, quantity: 3 },
      { id: 4, name: 'Товар-4', price: 400, quantity: 4 },
      { id: 5, name: 'Товар-5', price: 500, quantity: 5 },
    ],
  });
});

test('should handle a function deleteProduct', () => {
  expect(rootReducer(undefined, deleteProduct(5))).toEqual({
    storage: [
      { id: 1, name: 'Товар-1', price: 100, quantity: 1 },
      { id: 2, name: 'Товар-2', price: 200, quantity: 2 },
      { id: 3, name: 'Товар-3', price: 300, quantity: 3 },
      { id: 4, name: 'Товар-4', price: 400, quantity: 4 },
    ],
  });
});
