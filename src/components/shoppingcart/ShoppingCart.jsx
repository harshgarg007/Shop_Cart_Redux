import React, { useEffect } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchProducts, removeFromCart } from '../../redux/slices/cartSlice'


const ShoppingCart = () => {
    const dispatch = useDispatch();
//   const products = useSelector((state) => state.cart.products);
//   const cart = useSelector((state) => state.cart.cart);
//   const totalAmount = useSelector((state) => state.cart.totalAmount);
//   const status = useSelector((state) => state.cart.status);

  const {products, status} = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="shop">
     
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading products.</p>}
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt="" width={"80px"} />
            <h2>{product.title.slice(0,11)}</h2>
            <p>{product.price} USD</p>
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          </div>
        ))}
      </div>
  
    </div>
  );
}

export default ShoppingCart