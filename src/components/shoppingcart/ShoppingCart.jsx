import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchProducts,
  setCategory,
  setSortBy,
} from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { products, selectedCategory, sortBy, status } = useSelector(
    (state) => state.cart
  );

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const notify = () =>
    toast.success(`Item Added To Cart 😍`, {
      autoClose: 2000,
    });

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const sortProducts = (products) => {
    if (sortBy === "highToLow") {
      return [...products].sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    } else if (sortBy === "lowToHigh") {
      return [...products].sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    } else {
      return products;
    }
  };

  const handleCategoryChange = (event) => {
    dispatch(setCategory(event.target.value));
    // console.log(event);
  };

  if (status === "loading") {
    return <p className="load">Loading...</p>;
  }

  if (status === "failed") {
    return <p className="load">Error loading products.</p>;
  }

  return (
    <div className="shop">
      <div className="filters">
        <select className="sort-inp" value={sortBy} onChange={handleSortChange}>
          <option value="">Sort By Price</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="lowToHigh">Price: Low to High</option>
        </select>

       <div className="category">
       <span className="filter-text">Category</span>
        <select className="sort-inp" onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's</option>
          <option value="women's clothing">Women's</option>
        </select>
       </div>
      </div>

      <div className="products">
        {sortProducts(filteredProducts).map((product) => (
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
