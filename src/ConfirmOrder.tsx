import {useContext, useState} from "react"
import {CartContext} from "./useContext/useContext"
import UserContext, { UserContextType } from "./useContext/user";
import { useNavigate } from "react-router-dom";
import order from "./image/order.png"
import info from "./image/info.png"

interface cartItem {  //กำหนดชุดข้อมูลเพื่อกำหนดชนิดตัวแปรให้กับ cart
   id:number;
   title:string;
   price:number;
   discountPercentage:number;
   quantity:number;
   thumbnail:string;
   images:string;
}

const ConfirmOrder = () => {
 const [clickEdit,setClickEdit] = useState<boolean>(false); //สร้าง useState เพื่อเช็คว่า User ต้องการแก้ไขข้อมูลหรือไม่
 const [editFirstName,setEditFirstName] = useState<string>(''); // สร้าง useState เพื่อเก็บข้อมูลที่ User แก้ไข
 const [editLastName,setEditLastName] = useState<string>(''); 
 const [editAddress,setEditAddress] = useState<string>(''); 
 const [editPhone,setEditPhone] = useState<string>(''); 
 const {cart,setCart}:any = useContext(CartContext); // ดึงค่ามาจาก useContext ในไฟล์ useContext
 const [edit,setEdit] = useState({ //สร้าง useState เพื่อรับค่าที่ User แก้ไขและนำมาแสดง
   firstName:'',
   lastName:'',
   adress:'',
   phone:'',
 });
 const {user} = useContext(UserContext) as UserContextType; //ดึงค่ามาจาก useContext ในไฟล์ user
 const navigate = useNavigate();

 const sumPrice = cart.reduce((acc:number,curr:cartItem) => acc+((curr.price-((curr.price*curr.discountPercentage)/100))*curr.quantity),0);  // ประกาศตัวแปร sumPrice คำนวณผลรวมราคาของสินค้าทั้งหมดที่อยู่ในตะกร้า

 const handleOnSubmit = (e:any) =>{ // เมื่อ User กด Submit จะนำค่าที่ User แก้ไขมาเก็บไว้ใน useState [edit,setEdit] และเปลี่ยนค่า clickEdit เป็น false เพื่อซ่อนฟอร์ม
   e.preventDefault();
   setEdit({
      firstName:editFirstName,
      lastName:editLastName,
      adress:editAddress,
      phone:editPhone
   });

   setEditFirstName('');
   setEditLastName('');
   setEditAddress('');
   setEditPhone('');
   setClickEdit(false);
} 


  
 
  return (
   <div>
   <h1 className="text-center mt-[20px]">This is confirm order page</h1>
   
   <div className="flex items-center flex-col">

   <div className="flex flex-auto items-center  flex-col ">
   <img src={info} width={100} className="mt-[20px]"/>
     <h1 className="mt-[20px]">Customer information</h1>
      <div className="border border-2 border-black p-[30px] font-bold text-xl rounded w-[560px]">
      {edit.firstName ? <span> Name : {edit.firstName} </span> : <span className=""> Name : {user.firstName} </span>}
      {edit.lastName ? <span>{edit.lastName}</span> : <span>{user.lastName}</span>}   <br/>
      {edit.adress ? <span>Address : {edit.adress}</span> : <span>Address : {user.address}  {user.city} {user.state} {user.postalCode} </span>}<br/>
      {edit.phone ? <span>Phone : {edit.phone}</span>:<span>Phone : {user.phone}</span> }
        <div className="text-end">{!clickEdit ? <button onClick={()=>setClickEdit(true)} className="text-sky-500 font-medium">Edit</button> 
        : <div>
         <form onSubmit={handleOnSubmit}>
            <div  className="border border-2 border-black p-[30px] text-start  my-[20px]">
              <h3 className="text-center">Edit information</h3>
                     <div className="flex flex-col ">
                     <span className="mb-[10px]">Firstame</span>
                     <input type="text" onChange={(e) =>setEditFirstName(e.target.value)} value={editFirstName} className="border border-1 w-[300px] outline-none" />
                     <span className="my-[10px]">Lastname</span>
                     <input type="text" onChange={(e) =>setEditLastName(e.target.value)} value={editLastName} className="border border-1 w-[300px] outline-none" />
                     </div>

                     <div className="flex flex-col">
                     <span className="my-[10px]">Address</span> 
                     <input type="text" onChange={(e) =>setEditAddress(e.target.value)} value={editAddress} className="border border-1 w-[300px] outline-none"/>
                     </div>

                     <div className="flex flex-col"> 
                     <span className="my-[10px]">Phone</span>
                     <input type="number" onChange={(e) =>setEditPhone(e.target.value)} value={editPhone} className ="border border-1 w-[300px] outline-none"/>
                     </div>
                  
            </div>
             <button className="text-sky-500 font-medium">Done</button> 
             </form>
          </div>}
        </div>

      </div>    
   </div>

   
   <div className="flex-1 flex flex-col  items-center mt-[60px] ">
   <img src= {order} width={100}/>
      <h1 className="mt-[20px]">Your orders</h1>
      <div className="border border-2  mr-[20px] w-[800px] rounded mt-[20px]">
         { cart.map((item:cartItem)=>  (
               <div key={item.id} className=" flex items-center p-[20px]">
                 {item.images ? <div><img src={item.images[0]} width={100}/></div> : <div><img src={item.thumbnail} width={100}/></div>}
                  <div className="ml-[20px] flex">
                     <span className="font-bold ">Product : {item.title}</span>
                     <span className="font-bold mx-[15px]">Price : {Math.round((item.price - (item.price*item.discountPercentage/100))*100)/100}$</span>
                     <span className="font-bold">Quantity : {item.quantity}</span>
                     <span className="font-bold ml-[15px]">Total : {Math.round((item.price - ((item.price * item.discountPercentage)/100))* (item.quantity)*100)/100 }$ </span>
                  </div>
               </div>                 
         ))}
      </div>

      <div className="text-center mt-[20px]">
      {cart.length > 0 && <span className="text-2xl font-bold">Total price : {Math.round(sumPrice * 100)/100}$ </span>}
      </div>

         <div className="flex justify-center m-[20px] ">
               <button onClick={()=> {setCart([]) ,navigate("/FinalPage")}} className="mx-[20px] bg-sky-500 rounded-full h-[50px] w-[100px] text-white hover:bg-cyan-600 px-[20px]">Confirm</button>
               <button onClick={()=> navigate(-1)} className="mx-[20px] bg-yellow-500 hover:bg-amber-600 h-[50px] rounded-full text-white mx-[30px] px-[40px]">Back</button>
         </div>
      
   </div>
</div>

   
  
      
   </div>
   
  )
}
 export default ConfirmOrder 