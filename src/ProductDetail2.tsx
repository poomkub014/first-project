import {useState,useContext,useEffect} from "react";
import {CartContext} from "./useContext/useContext"
import { useLocation,Link,useNavigate } from "react-router-dom";
import { Rate,Button,Image } from "antd";
import OtherProductInCategory from "./OtherProductInCategory";
import axios from "axios";
import UserContext from "./useContext/user";
import cartIcon from "./image/cart.png"

interface Product{
  id:number;
  rating:number;
  title:string;
  discountPercentage:number;
  price:number;
  description:string;
};

interface Review{
  reviewerName:string;
  rating:number;
  comment:string;
  date:string;
};

const ProductDetail2 = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const {productId,rating} = location.state || {}; // รับค่า {productId,rating} จากหน้า OtherProdcutCategory
    const [product,setProduct] = useState<Product>([]); // สร้าง useState เพื่อเก็บข้อมูลสินค้า
    const [images,setImages] = useState<[] | string>([]); // สร้าง useState เพื่อเก็บรูปภาพสินค้า
    const [reviews,setReviews] = useState<[]>([]); // สร้าง useState เพื่อเก็บข้อมูลรีวิวสินค้า
    const [category,setCategory] = useState<string>(''); // สร้าง useState เพื่อเก็บข้อมูล category
    const {addToCart,cart} = useContext(CartContext);
    const {user,isLoggedIn,updateUser,handleLogin,setUserId} = useContext(UserContext);

    const FetchDetailProduct = async (productId:number) =>{  // ฟังก์ชั่น Fetch ข้อมูลตาม productId ที่รับมาจากหน้า OtherProdcutCategory
        const response = await axios.get(`https://dummyjson.com/products/${productId}`)
        setProduct(response.data);
        setCategory(response.data.category);
        setImages(response.data.images);
        setReviews(response.data.reviews);
    }
   


    useEffect(()=>{ // เรียกใช้ FetchDetailProduct ทุกครั้งเมื่อ
        FetchDetailProduct(productId)
       
    },[productId])

    

    
    const review = reviews.map((review:Review,index) =>{
      return (
        <div key={index} className='border border-1 p-[50px] mx-[40px] my-[10px] text-xl'>
          <p className='font-bold'>{review.reviewerName} : <Rate disabled  allowHalf defaultValue ={review.rating}></Rate></p>
          <p>{review.comment}</p>
          <p>{review.date}</p>
        </div>
      )
    })

    return (
   
      <div> 
     <div className=" flex justify-end p-[30px]">
            {isLoggedIn && <img src= {user.image}  width={40}/>}<p className='mx-[10px]  text-xl '>{user.firstName} {user.lastName}</p> 

            {isLoggedIn ?  <Button className='mx-[10px]' onClick={()=>{   
                window.location.reload();
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
      

<div className='border border-1 p-[50px] mx-[40px] my-[20px]'>
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
        
    </div> : <div className='flex justify-center'><Image src={images[0]} width={400}></Image></div>}
    
  
    <div className='text-center '>
      <h1 className='font-bold'>{product.title}</h1>
      <div className='mt-[30px]'> <span className='font-bold text-2xl '>Rating : <Rate disabled allowHalf defaultValue={rating}/> {rating}</span></div>
   
      {product.discountPercentage ? 
      <div className='mt-[20px]' >
      <span className='font-bold text-xl line-through'>Price : {product.price}$</span>
      <span className='font-bold text-xl mx-[10px]'>Discount : {product.discountPercentage} %</span><br/>
      <span className='font-bold text-xl'> Price : {Math.round((product.price - ((product.price * product.discountPercentage)/100))*100)/100}$</span></div>
      : <div><span className='font-bold text-xl'>Price : {product.price}</span></div>}
      </div>
      </div>
      <div className='px-[50px] text-start'>
          <div className='my-[20px] text-red-600 font-bold text-2xl text-start'>Description</div>
          <span className='ml-[20px] font-bold text-xl'>{product.description} </span>
      </div>  
    
  
    
  
    <div className='flex justify-center my-[30px]'>
          <div className='flex font-bold items-center px-[20px] py-[10px] m-[20px] rounded-xl transition hover:scale-105 bg-cyan-500 text-[white] active:bg-cyan-400 active:text-white border border-1   cursor-pointer ' onClick={()=>{addToCart(product)}}>
              Add to cart
             
          </div>
          <div className='flex font-bold items-center px-[30px]  m-[20px] rounded-xl transition hover:scale-105 bg-amber-500 text-[white] active:bg-amber-400 active:text-white border border-1 cursor-pointer ' onClick={()=> navigate("/Buypage",{state:{productId:product.id,rating:product.rating}})}>
              Buy
             
          </div>
    </div>

      <span className='font-bold ml-[50px] text-2xl text-red-600'>Review</span>
      <div>{review}</div>  
    <br/>


      <OtherProductInCategory category={category} />
    </div>
   
    )
}
export default ProductDetail2