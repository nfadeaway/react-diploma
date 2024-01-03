import {Link} from 'react-router-dom';

const ProductPreviewCard = (props) => {

  return (
    <div className="col-4">
      <div className="card">
        <img src={props.product.images[0]} className="card-img-top img-fluid" alt={props.product.title}/>
          <div className="card-body">
            <p className="card-text">{props.product.title}</p>
            <p className="card-text">{props.product.price} руб.</p>
            <Link to={`/catalog/${props.product.id}`} className="btn btn-outline-primary">Заказать</Link>
          </div>
      </div>
    </div>
  );
};

export default ProductPreviewCard;