import { INCREMENT, DECREMENT, ADD, DELETE } from './types';
import data from '../data.json';

const initialState = {
  storage: data,
};

/**
 * Изменяет переданный массив и возвращает новый.
 * @param {object} state - массив данных для отрисовки товара.
 * @param {function} action - функция возвращающая объект.
 * @returns {object} - измененный массив.
 */
export function rootReducer(state = initialState, action) {
  if (action.type === INCREMENT) {
    let newArray = state.storage.map((obj) => {
      if (obj.id === action.id) {
        return {
          name: obj.name,
          price: obj.price,
          quantity: obj.quantity + 1,
          id: obj.id,
        };
      } else {
        return obj;
      }
    });
    return { storage: newArray };
  } else if (action.type === DECREMENT) {
    let newArray = state.storage.map((obj) => {
      if (obj.id === action.id && obj.quantity > 1) {
        return {
          name: obj.name,
          price: obj.price,
          quantity: obj.quantity - 1,
          id: obj.id,
        };
      } else {
        return obj;
      }
    });
    return { storage: newArray };
  } else if (action.type === ADD) {
    const obj = {
      name: action.name,
      price: action.price,
      quantity: action.quantity,
      id: Math.random(),
    };
    return { storage: [obj, ...state.storage] };
  } else if (action.type === DELETE) {
    let newArray = [];
    state.storage.forEach((obj) => {
      if (obj.id !== action.id) {
        newArray.push(obj);
      }
    });
    return { storage: newArray };
  }

  return state;
}
