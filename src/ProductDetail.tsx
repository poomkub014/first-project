import React, { useEffect, useState } from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { Image,Button,Card } from 'antd'


const ProductDetail = () => {
    const { Meta } = Card;
    const location = useLocation();
    const {productId} = location.state || {};
    const [product,setProduct] = useState([])
    const [cart,setCart] = useState([])
 

    const FetchDetailProduct = async (productId) =>{
        const response = await axios.get(`https://dummyjson.com/products/${productId}`)
        setProduct(response.data)
        console.log(response.data);   
    }

    const addToCart = (product) =>{
    setCart([...cart,product])
    }

    const removeFromCart = (productId) =>{
    setCart(cart.filter(item => item.id !== productId));
    };
    
      
    useEffect(()=>{
        FetchDetailProduct(productId)
    },[])

    const renderCart = cart.map((cart) =>(
        <div key={cart.id} className='flex justify-between items-center p-2 border-b'>
            <div>
              <p>{cart.title}</p>
              <p>Price : {cart.price}$</p>
            </div>
            <Button onClick={()=>removeFromCart(cart.id)}>Remove</Button>
        </div>
      ));
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

          <div className='border p-4'>
          <h2 className='text-xl'>Cart</h2>
          {cart.length > 0 ? renderCart :<p>No item in cart</p>}
        </div>
          
    </div>
  )
}

export default ProductDetail