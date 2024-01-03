import OrderLoader from './elements/OrderLoader.jsx';
import Preloader from './elements/Preloader.jsx';

import isPhoneValid from '../utils/validationUtils.js';

import {useContext, useRef} from 'react';
import {ProductContext} from '../contexts/ProductContext.js';
import {useNavigate} from 'react-router-dom';

const Order = () => {

  const {sendOrderFlag, setSendOrderFlag, cartProducts} = useContext(ProductContext);
  const phoneInput = useRef(null);
  const phoneError = useRef(null);
  const addressInput = useRef(null);
  const addressError = useRef(null);
  const checkboxInput = useRef(null);
  const checkboxInputLabel = useRef(null);
  const productCountError = useRef(null);
  const navigate = useNavigate();

  const sendOrder = async () => {
    setSendOrderFlag('loading');
    let products = JSON.parse(localStorage.getItem('cartProducts'));
    products = products.map(product => {
      return {id: product.id, price: product.price, count: product.count};
    })
    const order = {
      owner: {
        phone: phoneInput.current.value,
        address: addressInput.current.value
      },
      items: products
    };
    try {
      let response = await fetch(import.meta.env.VITE_APP_SERVER_URL + '/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });
      response = await response;
      if (response.status === 204) {
        setSendOrderFlag('success');
        setTimeout(() => {
          localStorage.clear();
          navigate('/');
          setSendOrderFlag('no loading');
        }, 5000);
      } else {
        setSendOrderFlag('error');
        setTimeout(() => {
          setSendOrderFlag('no loading');
        }, 5000);
      }
    } catch (err) {
      setSendOrderFlag('error');
      setTimeout(() => {
        setSendOrderFlag('no loading');
      }, 5000);
    }
  };

  const createOrder = (e) => {
    e.preventDefault();
    !isPhoneValid() ? phoneError.current.classList.remove('hidden') : phoneError.current.classList.add('hidden');
    addressInput.current.value === '' ? addressError.current.classList.remove('hidden') : addressError.current.classList.add('hidden');
    !checkboxInput.current.checked ? checkboxInputLabel.current.classList.add('checkbox-error') : checkboxInputLabel.current.classList.remove('checkbox-error');
    cartProducts.length === 0 ? productCountError.current.classList.remove('hidden') : productCountError.current.classList.add('hidden');
    isPhoneValid() && addressInput.current.value !== '' && checkboxInput.current.checked && cartProducts.length > 0 && sendOrder();
  }

  return (
    sendOrderFlag === 'loading' ? <Preloader/> :
      sendOrderFlag === 'success' ? <OrderLoader status='success'/> :
        sendOrderFlag === 'error' ? <OrderLoader status='error'/> :
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
              <form className="card-body" onSubmit={createOrder}>
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input ref={phoneInput} className="form-control" id="phone" placeholder="Ваш телефон"/>
                  <div ref={phoneError} className="phone-error hidden">Введите корректный номер телефона</div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input ref={addressInput} className="form-control" id="address" placeholder="Адрес доставки"/>
                  <div ref={addressError} className="address-error hidden">Введите адрес доставки</div>
                </div>
                <div className="form-group form-check">
                  <input ref={checkboxInput} type="checkbox" className="form-check-input" id="agreement"/>
                  <label ref={checkboxInputLabel} className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                <button type="submit" className="btn btn-outline-secondary">Оформить</button>
                <div ref={productCountError} className="product-count-error hidden">Ваша корзина пуста</div>
              </form>
            </div>
          </section>
  );
};

export default Order;