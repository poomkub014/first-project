import React, { useContext } from 'react'
import { Button } from 'antd'
import { CartContext } from './useContext/useContext'

const Cart = () => {

 const {cart,removeFromCart} = useContext(CartContext);


  return (
    <div>
      <h1>Shopping Cart</h1>
   
  {cart.map((item)=>(
    <div key={item.id}>{item.title}
   <div onClick={()=>removeFromCart(item.id)}>Remove</div>
    </div>

  ))}
                   
                 
    </div>
)
}

export default Cart