import React,{useContext} from "react"
import {CartContext} from "./useContext/useContext"
import UserContext from "./useContext/user";
import { Button } from "antd";
import { Link,useLocation } from "react-router-dom";

const ConfirmOrder2 = () => {
 //const {cart} = useContext(CartContext);
 const {user} = useContext(UserContext);
 const location = useLocation();
 const {productTitle,price,quantity} = location.state || {};
 

  return (
   <div>
    
    This is confirm order page
   
   <div className="flex">
      <p className="border border-slate-300"> Name : {user.firstName} {user.lastName} <br/>
        Address : {user.address}  {user.city} {user.state} {user.postalCode} <br/>
        Phone : {user.phone}</p>
   </div>

     <div>
      <p>Title : {productTitle} </p>
      <p>Price : {price}$</p>
      <p>Quantity : {quantity}</p>
      </div>

   Total price {price*quantity}$
  
 
 
   <div>
      <Button><Link to = "/FinalPage">Confirm</Link></Button>
      <Link to ="/">Back to home page</Link>
      
   </div>
  
      
   </div>
   
  )
}
 export default ConfirmOrder2 