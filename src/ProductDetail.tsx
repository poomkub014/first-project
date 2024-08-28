import React, { useContext, useEffect, useState } from 'react'
import {useLocation,Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { Image,Button,Card,Rate } from 'antd'
import { CartContext } from './useContext/useContext';



const ProductDetail = () => {
    const { Meta } = Card;
    const navigate = useNavigate();
    const location = useLocation();
    const {productId,rating} = location.state || {};
    const [product,setProduct] = useState([])
    const {addToCart} = useContext(CartContext);
 

    const FetchDetailProduct = async (productId) =>{
        const response = await axios.get(`https://dummyjson.com/products/${productId}`)
        setProduct(response.data)
        console.log(response.data);   
    }

    

   
    useEffect(()=>{
        FetchDetailProduct(productId)
    },[])


  return (

    <div>ProductDetail Page <Button className =""><Link to ="/Cart">ตะกร้า</Link></Button> 
    
    <Card
              hoverable
              style={{ width: 240 }}
              cover={<Image alt="Product picture" src={product.thumbnail} />}
            >
             <Meta title={product.title} />
             <br/>
             <p className='text-lg font-bold'>Rate : <Rate disabled allowHalf defaultValue={rating}/></p>
             <p className='text-lg font-bold'>Price : {product.price}$</p>
             <hr/>
              <Button   className='mt-[15px] mx-[5px]' onClick={()=>addToCart(product)}>Add to cart</Button>
              <Button  className='mt-[15px] mx-[5px]' onClick={()=> navigate("/Buypage",{state:{productId:product.id,rating:product.rating}})}>Buy</Button>
          </Card>

       
    </div>
  )
}

export default ProductDetail