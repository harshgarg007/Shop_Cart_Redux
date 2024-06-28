import React from 'react'
import './style.css'
import { NavLink } from 'react-router-dom'
const Navbar = () => {


  return (
    <nav className='nav'>
         <NavLink to={"/"}  activeClassName="active" >Shopping Cart</NavLink>
         <NavLink to={"/cart"}  activeClassName="active">Cart 🛒</NavLink>
    </nav>
  )
}

export default Navbar