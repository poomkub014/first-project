import React,{useContext} from "react"
import {CartContext} from "./useContext/useContext"
import UserContext from "./useContext/user";

const ConfirmOrder = () => {
 const {cart} = useContext(CartContext);
 const {user} = useContext(UserContext)
 
 
 const sumPrice = cart.reduce((acc,curr) => acc+(curr.price*curr.quantity),0);
 
  return (
   <div>This is confirm order page
   
   
   {cart.map((item)=>(
    <div>Title : {item.title} Price : {item.price}$ Quantity : {item.quantity}</div>
   ))}
   
   Total price : {Math.round(sumPrice * 100)/100}$
   
   </div>
   
  )
}
 export default ConfirmOrder 