import {useState,useEffect, useContext} from 'react'
import { useLocation , Link, useNavigate} from 'react-router-dom'
import { Button,Image,Rate} from 'antd';
import axios from 'axios';
import UserContext from './useContext/user';
import { CartContext } from './useContext/useContext';
import cartIcon from "./image/cart.png";
import OtherProductInCategory from './OtherProductInCategory';
import { ProductItem } from './type/Product';

interface Review {
  reviewerName:string;
  comment:string;
  rating:number;
  date:string;
}


const Buypage = () => {
    const {isLoggedIn,handleLogin,updateUser,setUserId,user}:any = useContext(UserContext); // ดึงค่ามาจาก useContext ในไฟล์ user 
    const {cart}:any = useContext(CartContext); // ดึงค่ามาจาก useContext ในไฟล์ useContext
    const navigate = useNavigate(); // คำสั่งของ React-router-dom เป็นคำสั่งนำทางไปยังหน้าต่างๆที่เราต้องการ
    const location = useLocation(); // คำสั่งของ React-router-dom เป็นคำสั่งที่รับค่าจากอีก component อื่น

    const {productId,rating} = location.state || {};
    const [product,setProduct] = useState<ProductItem>(); // สร้าง useState เพื่อเก็บข้อมูลสินค้าจากการ Fetch
    const [reviews,setReviews] = useState<Review[]>([]); // สร้าง useState เพื่อเก็บข้อมูลรีวิวสินค้าจากการ Fetch
    const [quantity,setQuantity] = useState<number>(1); // สร้าง useState เพื่อเก็บจำนวนสินค้าที่ลูกค้าต้องการสั่งซื้อ
    const [images,setImages] = useState<string[]>([]); // สร้าง useState เพื่อเก็บข้อมูลรูปภาพสินค้าจากการ Fetch
    const [category,setCategory] = useState<string>(''); // สร้าง useState เพื่อเก็บหมวดหมู่สินค้าจากการ Fetch เพื่อส่งต่อไปยัง component อื่น

   

    const FetchDetailProduct = async () =>{  // รับค่า productId มาจากหน้า Pagination และ Fetch สินค้าตาม productId เมื่อลูกค้าทำการกดปุ่ม Buy ในหน้า Pagination
      try {
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        setProduct(response.data);
        setReviews(response.data.reviews);
        setImages(response.data.images);
        setCategory(response.data.category);
        
      } catch (error) {
        console.log("Error",error);
      }
        
    }

    useEffect(()=>{  // เป็นคำสั่งเอาไว้สำหรับเรียกใช้ฟังก์ชั่น FetchDetailProduct();
        FetchDetailProduct();
    },[])



    const review = reviews.map((review,index) =>{ // เป็นคำสั่งเอาไว้สำหรับแสดงรีวิวของลูกค้า
      return (
        <div key={index} className='border border-1 p-[50px] mx-[40px] my-[10px] text-xl'>
          <p className='font-bold'>{review.reviewerName} : <Rate disabled  allowHalf defaultValue ={review.rating}></Rate></p>
          <p>{review.comment}</p>
          <p>{review.date}</p>
        </div>
      )
    })


    const increaseQuantity = () =>{ // เป็นคำสั่งในการเพิ่มจำนวนสินค้าในการสั่งซื้อ
        if(quantity >= 1){
            setQuantity(quantity+1)
        }
    }
   
    const dereaseQuantity = () =>{ // เป็นคำสั่งในการลดจำนวนสินค้าในการสั่งซื้อ
        if(quantity > 1){
            setQuantity(quantity-1)
        }
    }

    const result = Math.round(((product?.price || 1) - (((product?.price || 1) * (product?.discountPercentage ||1))/100))*100)/100 // เป็นตัวแปรสำหรับแสดงราคาสินค้าหลังจาก Discount
  return (
    <div>
         <div className=" flex justify-end p-[30px]">
            {isLoggedIn && <img src= {user.image}  width={40}/>}<p className='mx-[10px]  text-xl '>{user.firstName} {user.lastName}</p> 

            {isLoggedIn ?  <Button className='mx-[10px]' onClick={()=>{   
                updateUser({firstName:'Guest'});
                handleLogin(false);
                setUserId(null);
                navigate("/");
              }}>Logout</Button> : <Button className='mx-[10px]'><Link to ="/Login">Sign Up</Link></Button> }    
            <div className = 'cursor-pointer text-center flex' onClick={()=>navigate("/cart")}>
            <img src={cartIcon} width={40} />
            {cart.length > 0 &&<span className='text-lg   text-red-500 font-bold'>{cart.length}</span>}
            </div>
          </div>   

            <div className='grid grid-cols-2'>

            <div className='justify-self-end'>
             {images.length > 1 ? <div>
      <div className='grid grid-cols-2 grid-rows-2 gap-2 items-center'>
        <div className='row-span-2 justify-self-end'>
          <Image src={images[0]} width={300}/>
        </div>

        <div>
          <Image src={images[1]} width={200}/>
          
        </div>
        <div>
        <Image src={images[2]} width={200}/>
        </div>
      </div>
        
    </div> : <Image src={images[0]} width={400}></Image>} 

    </div>    


    <div className='p-[50px]'>
        <h1 className='font-bold text-center'>{product?.title}</h1>
        <span className='font-bold text-xl'>Rating : <Rate disabled allowHalf defaultValue={rating}/></span>
        
        <br></br>
        <span className='text-lg font-bold line-through'>Price : {product?.price}$</span>
        <br />
        <span className='font-bold text-xl'>Discount : {product?.discountPercentage} %</span>
        <br/>
        <span className='font-bold text-xl'> Price : {result}$</span>


        <div className='flex justify-center'>
        <span className='my-[40px] mx-[20px] text-xl '>{product?.description}</span> 
        </div>


        <hr></hr>
        
        <div className='flex justify-center items-center'>
            
        <Button   className=' mx-[5px]' onClick={()=>{ isLoggedIn ? navigate('/ConfirmOrderPage2',{state:{quantity:quantity,productTitle:product?.title, price:result,image:images[0] }}) : navigate("/Login")}}>Confirm</Button>
        <Button  className=' mx-[5px]' onClick={()=>navigate(-1)}>Back</Button>
       
       <div className='ml-[10px] flex'>

      <div>
            <button onClick={dereaseQuantity} className=' hover:text-red-500 text-xl'>-</button>  
        </div>
        
        <div className='mx-[10px] text-xl'>
           {quantity}
        </div>
       
        <div>
          <button onClick={increaseQuantity} className='hover:text-green-300 text-xl'>+</button>
        </div>
        </div>
      </div>

     </div>
    </div>
             
          <span className='font-bold ml-[50px] text-2xl text-red-600'>Review</span>
          <div>{review}</div>
    <br/>

      <OtherProductInCategory category={category} />


    </div>
  )
}

export default Buypage 