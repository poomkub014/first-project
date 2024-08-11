import React, { useContext } from 'react'
import { Button } from 'antd'
import { CartContext } from './useContext/useContext'

const Cart = () => {

 const {cart,removeFromCart,increaseQuantity,decreaseQuantity} = useContext(CartContext);


  return (
    <div>
      <h1>Shopping Cart</h1>
   
  {cart.map((item)=>(
    <div key={item.id}>{item.title} - {item.quantity}
     <button onClick={()=>increaseQuantity(item.id)}>+</button>
     <button onClick={()=>decreaseQuantity(item.id)}>-</button>
   <button onClick={()=>removeFromCart(item.id)}>Remove</button>
    </div>

  ))}
                   
                 
    </div>
)
}

export default Cart