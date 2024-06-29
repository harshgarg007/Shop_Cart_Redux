import React from "react";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";

const Navbar = () => {
  const { cart } = useSelector((state) => state.cart);

  // Calculate the total quantity of items in the cart
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="nav">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Cart 🛒 {totalQuantity}
      </NavLink>
    </nav>
  );
};

export default Navbar;
