import { Image,Button,Card,Carousel,Rate} from 'antd'
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import { CartContext } from './useContext/useContext';



const PaginationPage = ({product}) => {
const {addToCart} = useContext(CartContext);

  const navigate = useNavigate();
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
        //  hoverable
          style={{ width: 240 }}
          cover={<Image alt="Product picture" src={product.thumbnail} />}
        >
         
          <Meta title={product.title}/>
         
          <br/>
          Rating : <Rate disabled  allowHalf defaultValue={product.rating}/>
     
          
          <br/>
          <h1 className='text-lg font-bold'>Price : {product.price}$</h1>
          <div  className='flex justify-end' ><p  onClick={()=>{
            navigate("/ProductDetail",{state:{productId:product.id}})
          }}  className='text-sky-500 cursor-pointer'>View detail</p> </div>
          <br />
          <hr></hr>
          <Button  className='mt-[15px] mx-[5px]' onClick={()=>addToCart(product)}>Add to cart</Button>
          <Button  className='mt-[15px] mx-[5px]' onClick={()=> navigate("/Buypage",{state:{productId:product.id,rating:product.rating}})}>Buy</Button>
      </Card>
     
    </div>
  });

 



  
  return (
    <div>
      <Carousel arrows infinite={false}>
        {product.map((product)=>(
          <div key={product.id}>
            <h3 style={contentStyle} className='text-xl flex flex-col items-center'><Image src={product.thumbnail} width={100} />
           {product.title}
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

