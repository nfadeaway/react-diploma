import './App.css';

import About from './components/About.jsx';
import Cart from './components/Cart.jsx';
import Catalog from './components/Catalog.jsx';
import Contacts from './components/Contacts.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Order from './components/Order.jsx';
import PageNotFound from './components/PageNotFound.jsx';
import ProductDetailCard from './components/ProductDetailCard.jsx';
import TopSales from './components/TopSales.jsx';

import {Route, Routes} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {ProductContext} from './contexts/ProductContext.js';


const App = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [productDetailCard, setProductDetailCard] = useState('loading');
  const [cartProducts, setCartProducts] = useState([]);
  const [totalCartCount, setTotalCartCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [sendOrderFlag, setSendOrderFlag] = useState('no loading');

  useEffect(() => {
    localStorage.getItem('cartProducts') && setCartProducts(JSON.parse(localStorage.getItem('cartProducts')));
    localStorage.getItem('totalCost') && setTotalCost(Number(localStorage.getItem('totalCost')));
  }, []);

  return (
    <ProductContext.Provider
      value={{
        searchQuery, setSearchQuery,
        productDetailCard, setProductDetailCard,
        cartProducts, setCartProducts,
        totalCartCount, setTotalCartCount,
        totalCost, setTotalCost,
        sendOrderFlag, setSendOrderFlag
    }}>
      <Header/>
      <Routes>
        <Route path="/" element={<Main sections={[<TopSales key={TopSales}/>, <Catalog key={Catalog}/>]}/>}/>
        <Route path="/catalog" element={<Main sections={[<Catalog key={Catalog}/>]}/>}/>
        <Route path="/about" element={<Main sections={[<About key={About}/>]}/>}/>
        <Route path="/contacts" element={<Main sections={[<Contacts key={Contacts}/>]}/>}/>
        <Route path="/catalog/:id" element={<Main sections={[<ProductDetailCard key={ProductDetailCard}/>]}/>} />
        <Route path="/cart" element={<Main sections={[<Cart key={Cart}/>, <Order key={Order}/>]}/>} />
        <Route path="*" element={<Main sections={[<PageNotFound key={PageNotFound}/>]}/>} />
      </Routes>
      <Footer/>
    </ProductContext.Provider>
  );
};

export default App;