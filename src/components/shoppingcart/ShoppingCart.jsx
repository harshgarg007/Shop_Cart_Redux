import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const notify = () => toast.success(`Item Added To Cart 😍`, {
    autoClose: 2000,
  });

  if (status === "loading") {
    return <p className="load">Loading...</p>;
  }

  if (status === "failed") {
    return <p className="load">Error loading products.</p>;
  }

  return (
    <div className="shop">
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt="" width={"80px"} height={"100px"} />
            <h2>{product.title.slice(0, 11)}</h2>
            <p>₹{product.price}</p>
            <button
              className="btn"
              onClick={() => {
                dispatch(addToCart(product));
                notify();
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
