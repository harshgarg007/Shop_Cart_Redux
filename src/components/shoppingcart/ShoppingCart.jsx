import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchProducts,
} from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  //   const products = useSelector((state) => state.cart.products);
  const { products, status } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const notify = () => toast.success(`Item Added To Cart 😍`, {
    autoClose: 2000,
  });

  return (
    <div className="shop">
      {status === "loading" && <p className="load">Loading...</p>}
      {status === "failed" && <p className="load">Error loading products.</p>}
      <div className="products">

        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt="" width={"80px"} />
            <h2>{product.title.slice(0, 11)}</h2>
            <p>₹{product.price}</p>
            <button
              className="btn"
              // onClick={() => dispatch(addToCart(product))}
              onClick={() => {
                dispatch(addToCart(product));
                notify(); // Trigger the notify function when adding to cart
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
