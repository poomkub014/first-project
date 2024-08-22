import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
import Login from './Login.tsx'
import ListProductByCategory from './ListProductByCategory.tsx'
import ProductDetail from './ProductDetail.tsx'
import Cart from './Cart.tsx'
import ConfirmOrder from './ConfirmOrder.tsx'
import './index.css'
import FinalPage from './FinalPage.tsx'
import Buypage from './Buypage.tsx'
import ConfirmOrder2 from './ConfirmOrder2.tsx'

import {
  createBrowserRouter,
  RouterProvider,
 
} from "react-router-dom";
import { CartProvider } from './useContext/useContext.tsx'
import {UserProvider} from './useContext/user.tsx'

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
  },{
    path:"FinalPage",
    element:<FinalPage/>
  },{
    path:"Buypage",
    element:<Buypage/>
  },{
    path:"ConfirmOrderPage2",
    element:<ConfirmOrder2/>
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(


  <React.StrictMode>
    
    <CartProvider>
    <UserProvider>
    <RouterProvider router={router} />
    </UserProvider>
    </CartProvider>
    
  </React.StrictMode>,
)
