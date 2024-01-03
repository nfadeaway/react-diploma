import {Link} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import {ProductContext} from '../contexts/ProductContext.js';

const Cart = () => {

  const {cartProducts, setCartProducts, totalCost, setTotalCost, sendOrderFlag} = useContext(ProductContext);
  let row = 0;

  useEffect(() => {
    if (sendOrderFlag === 'success') {
      setCartProducts([]);
      setTotalCost(0);
    }
  }, [sendOrderFlag]);

  useEffect(() => {
    localStorage.getItem('cartProducts') && setCartProducts(JSON.parse(localStorage.getItem('cartProducts')));
    localStorage.getItem('totalCost') && setTotalCost(Number(localStorage.getItem('totalCost')));
  }, []);

  const deleteProduct = (e) => {
    const newCartProducts = cartProducts.filter(cartProduct => cartProduct.uid !== e.target.dataset.uid);
    const newTotalCost = newCartProducts.reduce((acc, cartProduct) => acc + cartProduct.cost, 0);
    localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
    localStorage.setItem('totalCost', newTotalCost);
    setCartProducts(JSON.parse(localStorage.getItem('cartProducts')));
    setTotalCost(Number(localStorage.getItem('totalCost')));
  }

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Размер</th>
          <th scope="col">Кол-во</th>
          <th scope="col">Стоимость</th>
          <th scope="col">Итого</th>
          <th scope="col">Действия</th>
        </tr>
        </thead>
        <tbody>
          {cartProducts && cartProducts.map(cartProduct =>
            <tr key={cartProduct.uid}>
              <td scope="row">{++row}</td>
              <td><Link to={`/catalog/${cartProduct.id}`}>{cartProduct.title}</Link></td>
              <td>{cartProduct.size}</td>
              <td>{cartProduct.count}</td>
              <td>{cartProduct.price} руб.</td>
              <td>{cartProduct.cost} руб.</td>
              <td>
              <button className="btn btn-outline-danger btn-sm" data-uid={cartProduct.uid} onClick={deleteProduct}>Удалить</button>
              </td>
            </tr>
          )}
        <tr>
          <td colSpan="5" className="text-right">Общая стоимость</td>
          {totalCost !== 0 &&
            <td>{totalCost} руб.</td>
          }
        </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Cart;