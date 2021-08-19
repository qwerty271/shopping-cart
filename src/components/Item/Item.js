import React from 'react';
import './Item.css';
import { increment, decrement, deleteProduct } from '../../redux/actions';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';

/**
 * Компонент отвечающий за отрисовку товара.
 */
function Item(props) {
  const dispatch = useDispatch();

  /**
   * Прибавляет к текущему количеству еденицу.
   * @param {number} props.id - id товара
   */
  function plus() {
    dispatch(increment(props.id));
  }

  /**
   * Отнимает от текущего количества еденицу.
   * @param {number} props.id - id товара
   */
  function minus() {
    dispatch(decrement(props.id));
  }

  /**
   * Удаляет товар из таблицы и массива данных Redux.
   * @param {number} props.id - id товара
   */
  function removeItem() {
    dispatch(deleteProduct(props.id));
  }

  return (
    <tr className='row'>
      <td className='column'>{props.name}</td>
      <td className='column'>
        <p className={'price'}>{props.price} &#8381;</p>
      </td>
      <td className='column'>
        <div className='counter'>
          <button className='counter__button' type='button' onClick={minus}>
            -
          </button>
          <span className='counter__value' id={props.id}>
            {props.quantity}
          </span>
          <button className='counter__button' type='button' onClick={plus}>
            +
          </button>
        </div>
      </td>
      <td className='column'>
        <button className='item__delete' onClick={removeItem} />
      </td>
    </tr>
  );
}

function mapStateToProps(state) {
  return { data: state };
}

export default connect(mapStateToProps)(Item);
