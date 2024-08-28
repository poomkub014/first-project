import { Image,Button,Card,Carousel,Rate} from 'antd'
import { useContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { CartContext } from './useContext/useContext';
import axios from 'axios';



const PaginationPage = ({product}) => {
  const {addToCart} = useContext(CartContext);
  const [randomProduct,setRandomProduct] = useState([]);
  const navigate = useNavigate();
  const { Meta } = Card;
  const contentStyle: React.CSSProperties = {
    //width: '300px',
   // height: '230px',
    color: '#fff',
     //lineHeight: '20px',
    textAlign: 'center',
    //background: 'white',
  };


  const renderProduct = product.map((product)=>{
    return <div key={product.id} >
        <Card
        //  hoverable
          style={{ width: 240 }}
          cover={<Image alt="Product picture" src={product.thumbnail} />}
        >
         
          <Meta title={product.title}/>
         
          <br/>
          <p className='text-lg font-bold'>Rate : <Rate disabled allowHalf defaultValue={product.rating}/></p>
          <p className='text-lg font-bold'>Price : {product.price}$</p>
          <div  className='flex justify-end' ><p  onClick={()=>{
            navigate("/ProductDetail",{state:{productId:product.id,rating:product.rating}})
          }}  className='text-sky-500 cursor-pointer'>View detail</p> </div>
          <hr></hr>
          <Button  className='mt-[15px] mx-[5px]' onClick={()=>addToCart(product)}>Add to cart</Button>
          <Button  className='mt-[15px] mx-[5px]' onClick={()=> navigate("/Buypage",{state:{productId:product.id,rating:product.rating}})}>Buy</Button>
      </Card>
     
    </div>
  });

  const showRandomProduct = async () =>{
        
        const response = await axios.get(`https://dummyjson.com/products`,{
            params:{
                    
                    limit: 10,
                    skip: Math.floor(Math.random()*194)
            }
        })
        setRandomProduct(response.data.products)
      }   
      
useEffect(()=>{
  showRandomProduct()
},[])

  
  return (
    <div>
      
      <Carousel arrows autoplay >
        {randomProduct.map((product)=>(
          <div key={product.id}>
            <h3 style={contentStyle} className=' flex flex-col items-center rounded bg-red-800'><Image src={product.thumbnail} width={300} />
          <p className='cursor-pointer text-xl' onClick={()=>{
            navigate("/ProductDetail",{state:{productId:product.id}})
          }}> {product.title} </p>
          <p>Price : {product.price}$</p>
         
          <p> Rating : <Rate disabled  allowHalf defaultValue={product.rating}/></p>
            </h3>
          </div>
        ))}
      </Carousel>   
      <hr className='mt-[40px]'></hr>

      <h1 className='m-[20px] text-red-600 '>See our products</h1>
        <div className='px-[250px] grid  grid-cols-2 gap-4 justify-items-center'>
          {renderProduct}
        </div>   
        </div>     
  );
}

export default PaginationPage
