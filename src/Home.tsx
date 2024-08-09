import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button ,Pagination } from 'antd'
import Login from './Login'
import PaginationPage from './Pagination'
import FetchAllProduct,{Search} from './FetchAllProduct'
import SearchProduct from './Search'
import FetchCategories from './FetchCategories'
import ProductDetail from './ProductDetail'


function Home() {

  const [page,setPage] = useState(1)
  const [pageSize,setPageSize] = useState(10)
  const [product,setProduct] = useState([])
  const [keyword,setKeyword] = useState("")
  const [total,setTotal] = useState(194)
  const [query,setQuery] = useState('')

  
  const onShowSizeChange = (current, size) => {
    setPageSize(size)
    setPage(current)
    FetchProduct(current,size)
  };


  const FetchProduct = async (page,pageSize) => {
     const response =  await FetchAllProduct(page,pageSize,keyword)
    setProduct(response.products);
    setTotal(response.total)
    
  }
  

  const handleOnSubmit = (e) =>{
   e.preventDefault()
   setKeyword(query)
   setPage(1)
  }
  
  const handleOnChange = (e) => {
     setQuery(e.target.value)
    
  }
  
  
  useEffect(()=>{
  FetchProduct(page,pageSize)
  },[page,pageSize,keyword])
      
 
 

 
  

  return (
    <>
    <FetchCategories></FetchCategories>
      <div className="flex justify-end">
      
        <Button className =""><Link to ="/Login">เข้าสู่ระบบ</Link></Button>    
      
        <form onSubmit = {handleOnSubmit}>
     
            <input className = 'w-[200px] bg-[red]'  onChange ={handleOnChange}/>
        
         </form>
        
      </div>
        
    <PaginationPage product ={product} />
    <div className='flex justify-center my-[20px]'>

   <Pagination
      onChange={onShowSizeChange}
      defaultCurrent={1}
      current ={page}
      total={total}
    />
    </div>
    <Link to ="/detail">Go to detail page</Link>
    
    </>
  )
}

export default Home
