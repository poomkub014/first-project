 import { useEffect, useState ,useContext} from 'react'
import { Link } from 'react-router-dom'
import { Button ,Pagination } from 'antd'
import PaginationPage from './Pagination'
import FetchAllProduct from './FetchAllProduct'
import FetchCategories from './FetchCategories'
import UserContext from './useContext/user.tsx'
import MagnifyingGlass from "./image/Magnifyingglass.png"
import { CartContext } from './useContext/useContext.tsx'



function Home() {
  const [page,setPage] = useState(1)
  const [pageSize,setPageSize] = useState(10)
  const [product,setProduct] = useState([])
  const [total,setTotal] = useState(194)
  const [query,setQuery] = useState('')
  const [exploreProduct,setExploreProduct] = useState(false)
  const {user,updateUser,isLoggedIn,handleLogin} = useContext(UserContext);
  const {keyword,setKeyword} = useContext(CartContext);
 
  const onShowSizeChange = (current, size) => {
    setPageSize(size)
    setPage(current)
    FetchProduct(current,size)
  };


  const FetchProduct = async (page,pageSize) => {
     const response =  await FetchAllProduct(page,pageSize,keyword,exploreProduct)
    setProduct(response.products);
    setTotal(response.total);
    
  }
  

  const handleOnSubmit = (e) =>{
   e.preventDefault();
   setKeyword(query);
   setPage(1);
   setExploreProduct(true)
  }
  
  const handleOnChange = (e) => {
     setQuery(e.target.value);  
  }
  
  
  useEffect(()=>{
  FetchProduct(page,pageSize);
  },[page,pageSize,keyword,exploreProduct]);
     
  return (
    <div>
      
      <div className=' w-[100%] h-[80px] flex justify-between m-[20px] '>
      
      <div className='m-[10px]'> 
        Exclusive Product
      </div>

      <div>
        <button className='m-[10px] font-bold text-xl'>Home</button>
        <button className='m-[10px] font-bold text-xl'>Contact</button>
        <button className='m-[10px] font-bold text-xl'>About</button>
      </div>
      
      <div className="flex">  
      <form onSubmit = {handleOnSubmit} className=' bg-slate-100 flex h-[40px] '> 
            <input className = ' bg-slate-100 mx-[10px] w-[200px]' placeholder='What are you looking for ?' onChange ={handleOnChange}></input>
            <button><img src={MagnifyingGlass} className='w-[20px]'></img></button> 
        </form>
        <p className='mx-[10px]  text-xl '>{user.firstName}  {user.lastName}</p>    
        {isLoggedIn ? <Button className='mx-[10px]' onClick={()=>{   
            window.location.reload();
            updateUser({firstName:'Guest'});
            handleLogin(false);
          }}>Logout</Button> : <Button className='mx-[10px]'><Link to ="/Login">Sign Up</Link></Button> }    
        <Button className ="mr-[30px]"><Link to ="/Cart">ตะกร้า</Link></Button>       
      </div>

    </div>

    <hr></hr>

  <div className='mb-[40px]'>
    <h1 className='m-[20px] text-red-600 '>Categories</h1>
    <FetchCategories></FetchCategories>
  </div> 

<hr></hr>
          
  <div>
    <h1 className='m-[20px] text-red-600 '> Recommend products</h1>
    <PaginationPage product ={product} />
  </div>

    <div className='flex justify-center my-[20px]'>

{exploreProduct ?  <Pagination
      onChange={onShowSizeChange}
      defaultCurrent={1}
      current ={page}
      total={total}
    /> :   <Button className='w-[200px]' onClick={()=>setExploreProduct(true)}>Explore all products</Button>}
   
 
    </div>
  </div>
  )
}

export default Home
