import { INCREMENT, DECREMENT, ADD, DELETE } from './types';

export function increment(id) {
  return { type: INCREMENT, id: id };
}

export function decrement(id) {
  return { type: DECREMENT, id: id };
}

export function addProduct(name, price, quantity) {
  return { type: ADD, name: name, price: price, quantity: quantity };
}
export function deleteProduct(id) {
  return { type: DELETE, id: id };
}
