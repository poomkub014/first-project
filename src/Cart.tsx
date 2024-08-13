import React, { useContext } from 'react'
import { Button } from 'antd'
import { CartContext } from './useContext/useContext'
import {Link} from 'react-router-dom'
import ConfirmOrder from './ConfirmOrder'

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
     
     {cart.length > 0 ? <div>
      <Link to ="/ConfirmOrderPage">Confirm</Link>
      <Link to ="/">Back to Shopping</Link>  
     </div>               
                
      : <p>No item in cart</p>}
    </div>
)
}

export default Cart