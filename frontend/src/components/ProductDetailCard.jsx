import ErrorContentLoader from './elements/ErrorContentLoader.jsx';
import Preloader from './elements/Preloader.jsx';

import setCartProductsToLS from '../utils/localStorageUtils.js';

import {useParams} from 'react-router-dom';
import {useContext, useEffect, useRef} from 'react';
import {ProductContext} from '../contexts/ProductContext.js';
import {useNavigate} from 'react-router-dom';

const ProductDetailCard = () => {

  const params = useParams();
  const navigate = useNavigate();
  const productCount = useRef(null);
  const productSizes = useRef(null);
  const addToCartBtn = useRef(null);
  const {productDetailCard, setProductDetailCard, setCartProducts, setTotalCost} = useContext(ProductContext);

  const getProductDetailCard = async () => {
    setProductDetailCard('loading');
    try {
      let response = await fetch(import.meta.env.VITE_APP_SERVER_URL + `/api/items/${params.id}`);
      if (response.status === 200) {
        response = await response.json();
        setProductDetailCard(response);
      } else if (response.status === 404) {
        navigate('/404');
      }
    } catch(err) {
      setProductDetailCard('error');
    }
  };

  useEffect(() => {
    getProductDetailCard();
  }, []);

  const decreaseProductCount = () => {
    productCount.current.textContent !== '1' && --productCount.current.textContent;
  };

  const increaseProductCount = () => {
    productCount.current.textContent !== '10' && ++productCount.current.textContent;
  };

  const selectSize = (e) => {
    const sizes = productSizes.current.querySelectorAll('.catalog-item-size');
    sizes.forEach(size => size.classList.remove('selected'));
    e.target.classList.add('selected');
    addToCartBtn.current.textContent === 'Выберите размер' ? addToCartBtn.current.textContent = 'В корзину' : null;
  };

  const addToCart = () => {
    const selectedSize = productSizes.current.querySelector('.selected');
    if (!selectedSize) {
      addToCartBtn.current.textContent = 'Выберите размер';
    } else {
      const selectedProduct = {
        id: productDetailCard.id,
        uid: `${productDetailCard.id} ${productSizes.current.querySelector('.selected').textContent}`,
        title: productDetailCard.title,
        size: productSizes.current.querySelector('.selected').textContent,
        count: +productCount.current.textContent,
        price: productDetailCard.price,
        cost: productDetailCard.price * productCount.current.textContent
      };
      setCartProductsToLS(selectedProduct);
      setCartProducts(JSON.parse(localStorage.getItem('cartProducts')));
      setTotalCost(localStorage.getItem('totalCost'));
      navigate('/cart');
    }
  };

  return (
    productDetailCard === 'loading'
      ? <Preloader/>
      : productDetailCard === 'error'
        ? <ErrorContentLoader/> :
          <section className="catalog-item">
            <h2 className="text-center">{productDetailCard.title}</h2>
            <div className="row">
              <div className="col-5">
                <img src={productDetailCard.images[0]} className="img-fluid" alt="" />
              </div>
              <div className="col-7">
                <table className="table table-bordered">
                  <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{productDetailCard.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{productDetailCard.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{productDetailCard.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{productDetailCard.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{productDetailCard.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{productDetailCard.reason}</td>
                  </tr>
                  </tbody>
                </table>
                <div className="text-center" ref={productSizes}>
                  <p>Размеры в наличии:
                    {productDetailCard.sizes.map(size => size.available &&
                      <span className="catalog-item-size" onClick={selectSize}>{size.size}</span>)
                    }
                  </p>
                  {productDetailCard.sizes.find(size => size.available) &&
                    <p>Количество:
                      <span className="btn-group btn-group-sm pl-2">
                        <button className="btn btn-secondary" onClick={decreaseProductCount}>-</button>
                        <span className="btn btn-outline-primary" ref={productCount}>1</span>
                        <button className="btn btn-secondary" onClick={increaseProductCount}>+</button>
                      </span>
                    </p>
                  }
                </div>
                {productDetailCard.sizes.find(size => size.available) &&
                  <button className="btn btn-danger btn-block btn-lg" ref={addToCartBtn} onClick={addToCart}>В корзину</button>
                }
              </div>
            </div>
          </section>
  );
};

export default ProductDetailCard;