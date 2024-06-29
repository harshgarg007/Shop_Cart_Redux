import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingCart from "./components/shoppingcart/ShoppingCart";
import Cart from "./components/cart/Cart";
import Navbar from "./components/navbar/Navbar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar /> <ShoppingCart />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Navbar /> <Cart />
        </>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
