import { Image,Button,Card,Carousel } from 'antd'
import { useContext, useState } from 'react';
import {useNavigate,Link} from 'react-router-dom'
import { CartContext } from './useContext/useContext';
import Cart from './Cart';

const PaginationPage = ({product}) => {
const {addToCart} = useContext(CartContext);

  const navigate = useNavigate();
  const [number,setNumber] = useState(0)
  const { Meta } = Card;


 


  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    // lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  const renderProduct = product.map((product)=>{
    return <div key={product.id} >
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<Image alt="Product picture" src={product.thumbnail} />}
        >
          <div onClick={()=>{
            navigate("/ProductDetail",{state:{productId:product.id}})
          }}>
          <Meta title={product.title} description= {`Rating: ${product.rating}`} />
          </div>
          
          <br></br>
          <h1 className='text-lg font-bold'>Price : {product.price}$</h1>
          <br />
          <hr></hr>

          <Button  className='mt-[15px] mx-[5px]' onClick={()=>setNumber(number+1)}>Add Number</Button>
          <Button  className='mt-[15px] mx-[5px]' onClick={()=>addToCart(product)}>Add to cart</Button>
          <Button  className='mt-[15px] mx-[5px]'>Buy</Button>
      </Card>
    </div>
  });

 
console.log(number)


  
  return (
    <div>
      <Carousel arrows infinite={false}>
        {product.map((product)=>(
          <div key={product.id}>
            <h3 style={contentStyle}><Image src={product.thumbnail} width={100}/>
            <h1>{product.title}</h1>
            </h3>
          </div>
))}
</Carousel>   
        <div className='px-[250px] grid  grid-cols-2 gap-4 justify-items-center'>
          {renderProduct}
        </div>

         
        </div>
   
     
  )
}

export default PaginationPage

