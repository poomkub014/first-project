import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button ,Pagination } from 'antd'
import Login from './Login'
import PaginationPage from './Pagination'
import FetchAllProduct,{Search} from './FetchAllProduct'
import SearchProduct from './Search'



function Home() {

  const [page,setPage] = useState(1)
  const [pageSize,setPageSize] = useState(10)
  const [product,setProduct] = useState([])
  
  const onShowSizeChange = (current, size) => {
    setPageSize(size)
    setPage(current)
    FetchProduct(current,size)
  };


  const FetchProduct = async (page,pageSize) => {
    const response =  await FetchAllProduct(page,pageSize)
    console.log(response.products);
    setProduct(response.products)
  }
  
  const searchProduct = async(keyword) =>{
   const response = await Search(keyword)
   console.log(response)
   setProduct(response.products)
  }

  useEffect(()=>{
  FetchProduct(page,pageSize)
  },[page,pageSize])
      
 
 useEffect(()=>{
  searchProduct()
 },[product])
 
  

  return (
    <>
      
    <Link to ="/Login">เข้าสู่ระบบ</Link>
    <SearchProduct searchProduct = {searchProduct}/>  
    <PaginationPage product ={product} />
    <div className='flex justify-center my-[20px]'>
    
   
   <Pagination
      onChange={onShowSizeChange}
      defaultCurrent={1}
      total={194}
    />
    </div>
    <Link to ="/detail">Go to detail page</Link>
    
    </>
  )
}

export default Home
