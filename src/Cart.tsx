import { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import UserContext from './useContext/user'
import { Image } from 'antd'
import { CartContext } from './useContext/useContext'
import bin from "./image/bin.png"

interface cartItem {
  id:number;
  title:string;
  price:number;
  discountPercentage:number;
  quantity:number;
  thumbnail:string;
}

const Cart = () => {
 
 const {cart,removeFromCart,increaseQuantity,decreaseQuantity,clearProduct}:any = useContext(CartContext); // ใช้ useContext เพื่อนำเข้าตัวแปรจากไฟล์ useContext
 const {isLoggedIn}:any = useContext(UserContext); // ใช้ useContext เพื่อนำเข้าตัวแปรจากไฟล์ user
 const navigate = useNavigate();

 const handleOnClick = () =>{  //ฟังก์ชั่นเมื่อ User อยู่ในสถานะ Login และมีการคลิ๊ก จะนำทางไปยังหน้า ConfirmOrderPage หาก User ไม่ได้อยู่ในสถานะ Login จะนำทางไปยังหน้า Login

       isLoggedIn ? navigate("/ConfirmOrderPage",{state:{sumPrice:sumPrice}}) : navigate("/Login");
 };

 const sumPrice = cart.reduce((acc:number,curr:cartItem) => acc+((curr.price-((curr.price*curr.discountPercentage)/100))*curr.quantity),0); // ประกาศตัวแปร sumPrice คำนวณผลรวมราคาของสินค้าทั้งหมดที่อยู่ในตะกร้า

  return (
    <div>
     <h1 className='text-center font-bold m-[20px]'>Shopping Cart</h1>
     {cart.length > 0 ?  <div className='grid grid-cols-5  items-center text-center mx-[10%] font-bold text-xl border border-1 p-[20px]'>
        <div>
          Product
        </div>
        <div>
          Price
        </div>
        <div>
          Discount
        </div>
        <div>
          Quantity
        </div>
        <div>
          Subtotal
        </div>
      </div> : <div className='font-bold text-2xl flex flex-col items-center'>
        <p>No item in cart</p>
        <button className='hover:text-sky-400' onClick={()=> navigate(-1)}>Back</button>
        </div>}
         
     

  {cart.map((item:cartItem)=>(
    <div key={item.id} className='mx-[10%]'>
      <div className='grid grid-cols-5  items-center text-center font-bold'>
        <div className='flex items-center'><Image src ={item.thumbnail} width={200}/>
        {item.title}  
        </div>

        <div>
          {item.price}$
        </div>

        {item.discountPercentage ?  
        <div>
          {item.discountPercentage}%
        </div> : <div>-</div>}


        <div className='flex items-center justify-center'>
            <div onClick={()=>decreaseQuantity(item.id)} className='text-red-500  cursor-pointer mx-[10px] hover:text-orange-300'>-</div>
            <div>{item.quantity}</div>
            <div onClick={()=>increaseQuantity(item.id)} className='text-green-500 cursor-pointer mx-[10px] hover:text-lime-300'>+</div>
            <img src={bin} onClick={()=>removeFromCart(item)} className='cursor-pointer w-[40px]'/>
        </div>

        <div>Total : {Math.round((item.price - ((item.price * item.discountPercentage)/100)) * (item.quantity) *100)/100 }$ </div> 
        
       
        
        </div>
     <hr/>
    </div>
  ))}
     
     {cart.length > 0 &&
          <div className='grid grid-cols-2 mx-[10%]'>

            <div>
            </div>

            <div className='border border-2 border-black p-[30px] box-border'>
              <div className='grid grid-cols-3 justify-items-center font-bold m-[10px]'>
                  <div>Product</div>
                  <div>Quantity</div>
                  <div>Total</div>
              </div>
              {cart.map((item:cartItem) =>(
                <div className='m-[20px]'>
                <div className='grid grid-cols-3 font-bold items-center'>
                  <div>{item.title}</div>
                  <div className='justify-self-center'>{item.quantity}</div>
                  <div className='justify-self-center'>{Math.round((item.price - ((item.price * item.discountPercentage)/100))* (item.quantity)*100)/100 }$</div>
                 
                </div>
                <hr className='m-0'/>
                </div>
              ))}
            <div className='grid grid-cols-3 items-center'>
              <div></div>
              <div></div>
              <div className='justify-self-center text-xl font-bold '>Total : {Math.round(sumPrice * 100)/100}$</div>
              
            </div>
          </div>
              <div></div>

              <div className='m-[20px] flex justify-center'>
              <button className='bg-sky-500 rounded-full h-[50px] w-[100px] text-white hover:bg-cyan-600 px-[20px]' onClick={handleOnClick}>Confirm</button>
              <button className='bg-yellow-500 hover:bg-amber-600 h-[50px] rounded-full text-white mx-[30px]  px-[30px]' onClick={()=> navigate(-1)}>Back</button>
              <button className='bg-red-600 h-[50px] hover:bg-red-800 rounded-full text-white  px-[20px]' onClick={clearProduct}>Clear all product</button>   
              </div>
          </div>
      }
      
    </div>
)
}

export default Cart