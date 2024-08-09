import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
import Login from './Login.tsx'
import ListProductByCategory from './ListProductByCategory.tsx'
import ProductDetail from './ProductDetail.tsx'
import Prop2 from './prop2.tsx'
import Cart from './Cart.tsx'
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
  },{
    path:"ProductDetail",
    element:<ProductDetail/>
  },{
    path:"prop2",
    element:<Prop2/>
  },{
    path:"Cart",
    element: <Cart/>
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(


  <React.StrictMode>
    <CartProvider>
    <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>,
)
