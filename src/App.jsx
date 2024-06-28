import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingCart from "./components/shoppingcart/ShoppingCart";
import Cart from "./components/cart/Cart";
import Navbar from "./components/navbar/Navbar";
import './App.css'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /> <ShoppingCart /></> 
    },
    {
      path: "/cart",
      element: <><Navbar /> <Cart /></> ,
    },
  ]);

  return (
    <div className='App'>
     

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
