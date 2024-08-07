import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice'
import './style.css'
import { toast } from 'react-toastify';
const Cart = () => {
    const dispatch = useDispatch();
    const { cart, totalAmount } = useSelector((state) => state.cart)

    const notify = () => toast.success(`Item Added To Cart 😍`, {
      autoClose: 2000,
    });
    const notifyRemove = () => toast.warn(`Item Remove From Cart 👋`, {
      autoClose: 2000,
    });

  return (
    
    <>
     <h2 className='total'>Total  Cart Value: ₹{totalAmount}</h2>
    <div className="cart">
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
           <img src={item.image} alt="" width={"80px"} height={"80px"} />
          <h3>{item.title.slice(0, 11)}</h3>
          <p>₹{item.price.toFixed(0)}</p>
          <p>Quantity: {item.quantity}</p>
          <button className='cartBtn' onClick={() => { dispatch(addToCart(item));
          notify()
          }}>+</button>
          <button className='cartBtn' onClick={() => {
            dispatch(removeFromCart(item));
            notifyRemove();
          }}>-</button>
        </div>
      ))}
    </div>
    </>
  )
}

export default Cart