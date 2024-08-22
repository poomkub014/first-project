import React,{useContext} from "react"
import {CartContext} from "./useContext/useContext"
import UserContext from "./useContext/user";
import { Button } from "antd";
import { Link,useLocation } from "react-router-dom";

const ConfirmOrder = () => {
 const {cart,setCart} = useContext(CartContext);
 const {user} = useContext(UserContext)
 const location = useLocation();
 const {productTitle,price,quantity} = location.state || {};
 

   const sumPrice = cart.reduce((acc,curr) => acc+(curr.price*curr.quantity),0);

  
 
  return (
   <div>
    
    This is confirm order page
   
   <div className="flex">
      <p className="border border-slate-300"> Name : {user.firstName} {user.lastName} <br/>
        Address : {user.address}  {user.city} {user.state} {user.postalCode} <br/>
        Phone : {user.phone}</p>
   </div>
   
 
   { cart.map((item)=>(
    <div key={item.id}>Title : {item.title} Price : {item.price}$ Quantity : {item.quantity}</div>
   ))}
   

   {cart.length > 0 ? ` Total price : ${Math.round(sumPrice * 100)/100}$ ` : `Total price ${price*quantity}`}
  
 
 
   <div>
      <Button onClick={()=> setCart([])}><Link to = "/FinalPage">Confirm</Link></Button>
      <Link to ="/">Back to home page</Link>
      
   </div>
  
      
   </div>
   
  )
}
 export default ConfirmOrder 