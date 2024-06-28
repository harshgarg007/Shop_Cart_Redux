import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchProducts, removeFromCart } from '../../redux/slices/cartSlice'
const Cart = () => {
    const dispatch = useDispatch();
    const { cart, totalAmount } = useSelector((state) => state.cart)


  return (
    <>
    <h2>Cart</h2>
    <div className="cart">
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.title}</h3>
          <p>{item.price} USD</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => dispatch(addToCart(item))}>+</button>
          <button onClick={() => dispatch(removeFromCart(item))}>-</button>
        </div>
      ))}
    </div>
    <h2>Total: {totalAmount} USD</h2>
    </>
  )
}

export default Cart