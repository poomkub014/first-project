import React,{useState,useEffect, useContext} from 'react'
import { useLocation , Link, useNavigate} from 'react-router-dom'
import { Button,Image,Rate} from 'antd';
import axios from 'axios';
import UserContext from './useContext/user';


const Buypage = () => {
    const {isLoggedIn} = useContext(UserContext)
    const navigate = useNavigate();
    const location = useLocation();
    const{productId,rating} = location.state || {};
    const [product,setProduct] = useState([]);
    const [reviews,setReviews] = useState([]);
    const [quantity,setQuantity] = useState(1);


    const FetchDetailProduct = async (productId) =>{
        const response = await axios.get(`https://dummyjson.com/products/${productId}`)
        setProduct(response.data);
        setReviews(response.data.reviews);
    }

    useEffect(()=>{
        FetchDetailProduct(productId)
    },[])



   const review = reviews.map((items,index)=>{
       return (
       <div className='flex items-center flex-col m-[20px]' key={index}>
        <div>Rating : <Rate disabled  allowHalf defaultValue ={items.rating}/> </div>
        <div>Comment : {items.comment}</div>
        <div>Name : {items.reviewerName}</div>
       </div>     
   )})


    const increaseQuantity = () =>{
        if(quantity >= 1){
            setQuantity(quantity+1)
        }
    }
   
    const dereaseQuantity = () =>{
        if(quantity > 1){
            setQuantity(quantity-1)
        }
    }
  return (
    <div>Buy Page <Button className =""><Link to ="/Cart">ตะกร้า</Link></Button> 
    
             <div className='flex items-center flex-col'>
                 <Image alt="Product picture" src={product.thumbnail}  width={240}/>            
                 <p>{product.title}</p>
 
              <br></br>
              <h1 className='text-lg font-bold'>Price : {product.price}$</h1>
              <br />
              </div>

              <div className='flex justify-center'> Rating : <Rate disabled allowHalf defaultValue={rating}/> </div>

          <div className='flex justify-center'>
           <p className='my-[40px] mx-[20px] text-xl'>{product.description}</p> 
          </div>


          <hr></hr>
          <Button   className='mt-[15px] mx-[5px]' onClick={()=>{ isLoggedIn ? navigate('/ConfirmOrderPage2',{state:{quantity:quantity,productTitle:product.title, price:product.price }}) : navigate("/Login")}}>Confirm</Button>
          <Button  className='mt-[15px] mx-[5px]' onClick={()=>navigate('/')}>Back</Button>

        {quantity}
          <button onClick={increaseQuantity}>+</button>
          <button onClick={dereaseQuantity}>-</button>
         {review}
    </div>
  )
}

export default Buypage 