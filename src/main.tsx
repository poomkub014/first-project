import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
import Login from './Login.tsx'
import ListProductByCategory from './ListProductByCategory.tsx'
import ProductDetail from './ProductDetail.tsx'
import Cart from './Cart.tsx'
import ConfirmOrder from './ConfirmOrder.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
 
} from "react-router-dom";
import { CartProvider } from './useContext/useContext.tsx'


const router = createBrowserRouter([

  {
    path: "/",
    element: <Home/> 
    
  },

  {
    path: "detail",
    element: <div>this is detail page</div> 
  },
  {
    path: "Login",
    element: <Login/>
  },
  {
    path: "ShowProductByCategory",
    element:<ListProductByCategory/> 
  },
  {
    path:"ProductDetail",
    element:<ProductDetail/>
  },
  {
    path:"Cart",
    element: <Cart/>
  },
  {
    path:"ConfirmOrderPage",
    element:<ConfirmOrder/>
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(


  <React.StrictMode>
    <CartProvider>
    <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>,
)
