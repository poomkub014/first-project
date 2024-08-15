import { useEffect, useState ,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Button ,Pagination } from 'antd'
import PaginationPage from './Pagination'
import FetchAllProduct from './FetchAllProduct'
import FetchCategories from './FetchCategories'
import UserContext from './useContext/user.tsx'



function Home() {
  const [page,setPage] = useState(1)
  const [pageSize,setPageSize] = useState(10)
  const [product,setProduct] = useState([])
  const [keyword,setKeyword] = useState("")
  const [total,setTotal] = useState(194)
  const [query,setQuery] = useState('')
  const {user,updateUser,isLoggedIn,handleLogout} = useContext(UserContext);
  const [login,setLogin] = useState(false)
  const navigate = useNavigate()
 
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
        {user.username}
        
        {isLoggedIn ? <p onClick={()=>{   
            window.location.reload()
            updateUser({username:'guest'})
            handleLogout()        
          }}>Logout</p> : <Button className =""><Link to ="/Login">เข้าสู่ระบบ</Link></Button> }
     
         
        <Button className =""><Link to ="/Cart">ตะกร้า</Link></Button>   
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
