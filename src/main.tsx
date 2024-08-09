import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
import Login from './Login.tsx'
import ListProductByCategory from './ListProductByCategory.tsx'
import ProductDetail from './ProductDetail.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
 
} from "react-router-dom";

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
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(


  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
