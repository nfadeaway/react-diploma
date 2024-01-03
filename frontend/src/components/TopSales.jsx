import ErrorContentLoader from './elements/ErrorContentLoader.jsx';
import Preloader from './elements/Preloader.jsx';
import ProductPreviewCard from './ProductPreviewCard.jsx';

import {useEffect, useState} from 'react';

const TopSales = () => {
  const [topSales, setTopSales] = useState('loading');

  const getTopSalesProducts = async () => {
    try {
      let response = await fetch(import.meta.env.VITE_APP_SERVER_URL + '/api/top-sales');
      if (response.status === 200) {
        response = await response.json();
        setTopSales(response);
      }
    } catch(err) {
      setTopSales('error');
    }
  };

  useEffect(() => {
    getTopSalesProducts();
  }, []);

  return (
      topSales === 'loading'
        ? <Preloader title={<h2 className="text-center">Хиты продаж!</h2>}/>
        : topSales === 'error'
          ? <ErrorContentLoader/>
          : topSales.length > 0 &&
            <section className="top-sales">
              <h2 className="text-center">Хиты продаж!</h2>
              <div className="row">
                {topSales.map(product => <ProductPreviewCard product={product} key={product.id}/>)}
              </div>
            </section>
  );
};

export default TopSales;