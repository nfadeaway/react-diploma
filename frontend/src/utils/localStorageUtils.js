const setCartProductsToLS = (selectedProduct) => {

  let cartProducts;
  let sameProduct;
  if (localStorage.cartProducts) {
    cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    sameProduct = cartProducts.find(product => product.id === selectedProduct.id && product.size === selectedProduct.size);
    if (sameProduct) {
      sameProduct.count = +sameProduct.count + +selectedProduct.count;
      sameProduct.cost = +sameProduct.cost + +selectedProduct.cost;
    } else {
      cartProducts.push(selectedProduct);
    }
  } else {
    cartProducts = [];
    cartProducts.push(selectedProduct);
  }
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  localStorage.totalCost
    ? localStorage.setItem('totalCost', (+localStorage.getItem('totalCost') + selectedProduct.cost).toString())
    : localStorage.setItem('totalCost', selectedProduct.cost.toString());
};

export default setCartProductsToLS;