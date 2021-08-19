import React from 'react';
import './Cart.css';
import Item from '../Item/Item';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/actions';

/**
 * Компонент отвечающий за отрисовку корзины.
 */
function Cart(props) {
  const [products, setProducts] = React.useState();
  const [prices, setPrices] = React.useState();
  const [formName, setFormName] = React.useState('');
  const [formPrices, setFormPrices] = React.useState('');
  const [formQuantity, setFormQuantity] = React.useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    let containPrices = 0;
    let containProducts = 0;
    props.data.storage.forEach((element) => {
      containPrices = containPrices + element.price * element.quantity;
      containProducts = containProducts + Number(element.quantity);
    });
    setPrices(containPrices);
    setProducts(containProducts);
  }, [props.data.storage]);

  /**
   * Обрабатывает ввод пользователя в input-name.
   * @param {*} event - общие свойства и методы для всех событий.
   */
  function handleNameChange(event) {
    setFormName(event.target.value);
  }

  /**
   * Обрабатывает ввод пользователя в input-price.
   * @param {*} event - общие свойства и методы для всех событий.
   */
  function handlePriceChange(event) {
    setFormPrices(event.target.value);
  }

  /**
   * Обрабатывает ввод пользователя в input-quantity.
   * @param {*} event - общие свойства и методы для всех событий.
   */
  function handleQuantityChange(event) {
    setFormQuantity(event.target.value);
  }

  /**
   * Сабмит формы, добавляет товар в таблицу и в массив данных Redux.
   * @param {*} event - общие свойства и методы для всех событий.
   */
  function formAdd(event) {
    event.preventDefault();
    dispatch(addProduct(formName, formPrices, formQuantity));
    setFormName('');
    setFormPrices('');
    setFormQuantity('');
  }

  /**
   * Сабмит формы, при наличии бэкенда отправка массива данных с корзины.
   * @param {*} event - общие свойства и методы для всех событий.
   */
  function formCheckout(event) {
    event.preventDefault();
    // api
    //   .nameMethod(props.data.storage)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  return (
    <section className='cart'>
      <h1 className='cart__title'>Корзина</h1>
      <hr className='cart__line' />
      <table className='table'>
        <tbody>
          <tr className='table__row'>
            <th className='table__column'>Название</th>
            <th className='table__column'>Цена</th>
            <th className='table__column'>Кол-во</th>
            <th className='table__column'></th>
          </tr>
        </tbody>
        <tbody>
          {props.data.storage.map((item) => {
            return (
              <Item
                name={item.name}
                price={item.price}
                key={item.id}
                id={item.id}
                quantity={item.quantity}
              />
            );
          })}
        </tbody>
      </table>
      <form className='form-checkout' onSubmit={formCheckout}>
        <p className='cart__total'>Всего товаров: {products} шт.</p>
        <p className='cart__total'>Общая сумма: {prices} &#8381;</p>
        <button className='form-checkout__button' type='submit'>
          Оформить заказ
        </button>
      </form>
      <form className='form-add' onSubmit={formAdd}>
        <input
          className='form-add__input'
          placeholder='Название'
          type='text'
          name='name'
          value={formName}
          onChange={handleNameChange}
          required
        ></input>
        <input
          className='form-add__input'
          placeholder='Цена'
          type='number'
          name='price'
          value={formPrices}
          onChange={handlePriceChange}
          required
        ></input>
        <input
          className='form-add__input'
          placeholder='Количество'
          type='number'
          name='quantity'
          maxLength='4'
          value={formQuantity}
          onChange={handleQuantityChange}
          required
        ></input>
        <button className='form-add__button' type='submit'>
          Добавить товар
        </button>
      </form>
    </section>
  );
}

function mapStateToProps(state) {
  return { data: state };
}

export default connect(mapStateToProps)(Cart);
