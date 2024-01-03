const OrderLoader = (props) => {

  return (
    props.status === 'success'
      ?
      <div className="success-order-loader">
        Заказ успешно сформирован. Мы свяжемся с вами в ближайшее время!<br/>Через 5 секунд вы будете перенаправлены на главную страницу сайта...
      </div>
      :
      <div className="error-order-loader">
        Ошибка связи с сервером. Попробуйте повторить операцию позднее. <br/>Через 5 секунд страница будет обновлена...
      </div>
  );
};

export default OrderLoader;