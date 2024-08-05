import { Image,Button,Card } from 'antd'
import { useState } from 'react';


const PaginationPage = ({product}) => {

  const { Meta } = Card;

  const [cart,setCart] =useState([])
  
  const addToCart = (product) =>{
    setCart([...cart,product])
  };

  const removeFromCart = (productId) =>{
    setCart(cart.filter(item => item.id !== productId));
  };


  const renderProduct = product.map((product)=>{
    return <div key={product.id} >
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<Image alt="Product picture" src={product.thumbnail} />}
        >
          <Meta title={product.title} description= {`Rating: ${product.rating}`} />
          <br></br>
          <h1 className='text-lg font-bold'>Price : {product.price}$</h1>
          <br />
          <hr></hr>
          
          <Button  className='mt-[15px] mx-[5px]' onClick={()=>addToCart(product)}>Add to cart</Button>
          <Button  className='mt-[15px] mx-[5px]'>Buy</Button>
      </Card>
    </div>
  });

    const renderCart = cart.map((item) =>(
      <div key={item.id} className='flex justify-between items-center p-2 border-b'>
          <div>
            <p>{item.title}</p>
            <p>Price : {item.price}$</p>
          </div>
          <Button onClick={()=>removeFromCart(item.id)}>Remove</Button>
      </div>
    ));

  
  return (
    <div>
      
        <div className='px-[250px] grid  grid-cols-2 gap-4 justify-items-center'>
          {renderProduct}
        </div>

        <div className='border p-4'>
          <h2 className='text-xl'>Cart</h2>
          {cart.length > 0 ? renderCart :<p>No item in cart</p>}
        </div>

    </div>
     
  )
}

export default PaginationPage

