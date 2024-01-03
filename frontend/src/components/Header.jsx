import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import {ProductContext} from '../contexts/ProductContext.js';

const Header = () => {

  const {cartProducts, totalCartCount, setTotalCartCount, setSearchQuery} = useContext(ProductContext);
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    setTotalCartCount(cartProducts.length);
  }, [cartProducts]);

  const sendSearchQuery = (e) => {
    e && e.preventDefault();
    let searchInput = document.querySelector('.header-search').querySelector('.form-control');
    if (searchInput.value) {
      setSearchQuery(searchInput.value);
      location.pathname !== '/catalog' && navigate('/catalog');
      searchInput.value = '';
    }
    document.querySelector('.header-search').classList.add('hidden');
  };

  const openSearchField = () => {
    document.querySelector('.header-search').classList.contains('hidden')
      ? document.querySelector('.header-search').classList.remove('hidden')
      : sendSearchQuery();
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              <img src="/img/header-logo.png" alt="Bosa Noga" />
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Главная</Link>
                </li>
                <li className="nav-item">
                  <Link to="/catalog" className="nav-link">Каталог</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">О магазине</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contacts" className="nav-link">Контакты</Link>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <form className="catalog-search-form form-inline header-search hidden" onSubmit={sendSearchQuery}>
                    <input className="form-control" placeholder="Поиск" />
                  </form>
                  <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={openSearchField}>
                  </div>
                  <Link to="/cart">
                    <div className="header-controls-pic header-controls-cart">
                      {totalCartCount > 0 &&
                        <div className="header-controls-cart-full">{totalCartCount}</div>
                      }
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </Link>
                </div>
                <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                  <input className="form-control" placeholder="Поиск"/>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;