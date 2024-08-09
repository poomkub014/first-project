import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useLocation,useNavigate} from 'react-router-dom'
import { Image,Button,Card,Pagination } from 'antd'
import ProductDetail from './ProductDetail'

const ListProductByCategory = () => {
  const navigate = useNavigate();
  const { Meta } = Card;
  const location = useLocation();
  const {keyword} = location.state || {};
  const [products,setProducts] = useState([])
  const [total,setTotal] = useState(0)
  const [page,setPage] = useState(1)
  const [pageSize,setPageSize] = useState(10)

  const onShowSizeChange = (current, size) => {
    setPageSize(size)
    setPage(current)
    fetchProductByCategory(current,size)
  };

  const fetchProductByCategory = async(page,pageSize,keyword) =>{
    const skip = (page-1)*pageSize
    const response = await axios.get(`https://dummyjson.com/products/category/${keyword}`,{
      params:{
        limit:pageSize,
        skip:skip
      }
    })  
    setProducts(response.data.products);  
    setTotal(response.data.total);
  }
  
  useEffect(()=>{
    fetchProductByCategory(page,pageSize,keyword)
    },[page,pageSize,keyword])

    const renderProduct = products.map((product)=>{
      return <div key={product.id} >
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<Image alt="Product picture" src={product.thumbnail} />}
          >
            <div onClick = {()=>{  
        navigate("/ProductDetail",{state:{productId:product.id}})
      }}>
        
           <Meta title={product.title} description= {`Rating: ${product.rating}`}  />
           </div>
            <br></br>
            <h1 className='text-lg font-bold'>Price : {product.price}$</h1>
            <br />
            <hr></hr>
            
            <Button   className='mt-[15px] mx-[5px]' onClick={()=>addToCart(product)}>Add to cart</Button>
            <Button  className='mt-[15px] mx-[5px]'>Buy</Button>
        </Card>
      </div>
    });
  
  return (
  <div>
      {keyword}
      <div className='px-[250px] grid  grid-cols-2 gap-4 justify-items-center'>
          {renderProduct}
        </div>

      <div className='flex justify-center my-[20px]'>
        <Pagination
      onChange={onShowSizeChange}
      defaultCurrent={1}
      current ={page}
      total={total}
    />
    </div>
  </div>
  )
  
}
export default ListProductByCategory