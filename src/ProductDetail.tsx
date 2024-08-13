import React, { useContext, useEffect, useState } from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { Image,Button,Card } from 'antd'
import { CartContext } from './useContext/useContext';


const ProductDetail = () => {
    const { Meta } = Card;
    const location = useLocation();
    const {productId} = location.state || {};
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

    <div>ProductDetail Result  {productId}
    <Card
              hoverable
              style={{ width: 240 }}
              cover={<Image alt="Product picture" src={product.thumbnail} />}
            >
             <Meta title={product.title} description= {`Rating: ${product.rating}`}  />   
              <br></br>
              <h1 className='text-lg font-bold'>Price : {product.price}$</h1>
              <br />
              <hr></hr>
              
              <Button   className='mt-[15px] mx-[5px]' onClick={()=>addToCart(product)}>Add to cart</Button>
              <Button  className='mt-[15px] mx-[5px]'>Buy</Button>
          </Card>

          
    </div>
  )
}

export default ProductDetail