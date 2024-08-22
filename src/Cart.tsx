import React, { useContext } from 'react'
import { CartContext } from './useContext/useContext'
import {useNavigate,Link} from 'react-router-dom'
import UserContext from './useContext/user'
import { Button } from 'antd'


const Cart = () => {

 const {cart,removeFromCart,increaseQuantity,decreaseQuantity,clearProduct} = useContext(CartContext);
 const {isLoggedIn} = useContext(UserContext);
 const navigate = useNavigate()
 const handleOnClick = () =>{
  isLoggedIn ? navigate("/ConfirmOrderPage") : navigate("/Login")
 }

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
      <Button onClick={handleOnClick}>Confirm</Button>
      <Link to ="/">Back to Shopping</Link>  
      <Button onClick={clearProduct}>Clear all product</Button>
     </div>               
                
      : <p>No item in cart</p>}
    </div>
)
}

export default Cart