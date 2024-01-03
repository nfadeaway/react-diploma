import ErrorContentLoader from './elements/ErrorContentLoader.jsx';
import Preloader from './elements/Preloader.jsx';
import ProductPreviewCard from './ProductPreviewCard.jsx';

import getURL from '../utils/URLUtils.js';

import {useContext, useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {ProductContext} from '../contexts/ProductContext.js';

const Catalog = () => {

  const {searchQuery, setSearchQuery} = useContext(ProductContext);
  const [catalogProducts, setCatalogProducts] = useState('loading');
  const [catalogCategories, setCatalogCategories] = useState('loading');
  const [moreProductsBtnFlag, setMoreProductsBtnFlag] = useState('btn');
  const [offset, setOffset] = useState(6);
  let location = useLocation();
  const catalogNav = useRef(null);
  const searchField = useRef(null);

  const getCatalogProducts = async (categoryId = 'all', isBtn = false, query = undefined) => {
    query = query === 'unset' ? '' : searchQuery;
    if (isBtn) {
      setMoreProductsBtnFlag('loading');
    } else {
      setCatalogProducts('loading');
      setMoreProductsBtnFlag('no btn');
    }
    const URL = getURL(categoryId, isBtn, query, offset);
    try {
      let response = await fetch(URL);
      if (response.status === 200) {
        response = await response.json();
        if (isBtn) {
          setCatalogProducts([...catalogProducts, ...response]);
          setOffset(offset + 6);
        } else {
          setCatalogProducts(response);
        }
        response.length < 6 ? setMoreProductsBtnFlag('no btn') : setMoreProductsBtnFlag('btn');
      }
    } catch(err) {
      console.log(err);
      isBtn ? setMoreProductsBtnFlag('error') : setCatalogProducts('error');
    }
  };

  const getCategoryProducts = (e) => {
    e.preventDefault();
    if (e.currentTarget.classList.contains('nav-link')) {
      setOffset(6);
      catalogNav.current.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
      e.currentTarget.classList.add('active');
      getCatalogProducts(e.currentTarget.dataset.id);
    } else {
      const categoryId = catalogNav.current.querySelector('.active').dataset.id;
      e.currentTarget.classList.contains('btn-outline-primary') && getCatalogProducts(categoryId,true);
      e.currentTarget.classList.contains('catalog-search-form') && setSearchQuery(searchField.current.value);
    }
  };

  const getCatalogCategories = async () => {
    setCatalogCategories('loading');
    try {
      let response = await fetch(import.meta.env.VITE_APP_SERVER_URL + '/api/categories');
      if (response.status === 200) {
        response = await response.json();
        setCatalogCategories(response);
      }
    } catch(err) {
      setCatalogCategories('error');
    }
  };

  useEffect(() => {
    if (location.pathname == '/') {
      setSearchQuery('');
      getCatalogProducts('all', false, 'unset');
    } else {
      getCatalogProducts();
    }
    getCatalogCategories();
  },[location.pathname]);

  useEffect(() => {
    if (document.querySelector('.catalog-categories')) {
      getCatalogProducts(document.querySelector('.catalog-categories').querySelector('.active').dataset.id)
    }
  },[searchQuery]);

  return (
    catalogProducts === 'loading' && catalogCategories === 'loading'
      ? <Preloader title={<h2 className="text-center">Каталог</h2>}/>
      : catalogProducts === 'error' || catalogCategories === 'error'
        ? <ErrorContentLoader/>
        :
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {location.pathname === '/catalog' &&
              <form className="catalog-search-form form-inline" onSubmit={getCategoryProducts}>
                <input className="form-control" placeholder="Поиск" defaultValue={searchQuery} ref={searchField}/>
              </form>
            }
            <ul className="catalog-categories nav justify-content-center" ref={catalogNav}>
              <li className="nav-item">
                <Link to="#" className="nav-link active" data-id="all" onClick={getCategoryProducts}>Все</Link>
              </li>
              {Array.isArray(catalogCategories) && catalogCategories.length > 0 &&
                catalogCategories.map(category =>
                  <li className="nav-item" key={category.id}>
                    <Link to="#" className="nav-link" data-id={category.id} onClick={getCategoryProducts}>{category.title}</Link>
                  </li>
                )
              }
            </ul>
            <div className="row">
              {catalogProducts === 'loading' && <Preloader/>}
              {Array.isArray(catalogProducts) && catalogProducts.length > 0 && catalogProducts.map(product => <ProductPreviewCard product={product} key={'catalog ' + product.id}/>)}
              {catalogProducts.length === 0 && <div className="no-products">Ничего не найдено</div>}
            </div>
            {moreProductsBtnFlag === 'loading'
              ? <Preloader/>
              : moreProductsBtnFlag === 'error'
                ? <ErrorContentLoader/>
                : moreProductsBtnFlag === 'btn'
                  ?
                    <div className="text-center">
                      <button className="btn btn-outline-primary" onClick={getCategoryProducts}>Загрузить ещё</button>
                    </div>
                  : null
            }
          </section>
  );
};

export default Catalog;