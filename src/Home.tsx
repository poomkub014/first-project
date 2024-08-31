 import { useEffect, useState ,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Button ,Pagination,Image } from 'antd'
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
  const [newArrival,setNewArrival] = useState('');
  const [newArrival2,setNewArrival2] = useState('');
  const [newArrival3,setNewArrival3] = useState('');
  const [title,setTitle] = useState('');
  const [title2,setTitle2] = useState('');
  const [title3,setTitle3] = useState('');
  const {user,updateUser,isLoggedIn,handleLogin} = useContext(UserContext);
  const {keyword,setKeyword} = useContext(CartContext);
  const navigate = useNavigate();
 
  const onShowSizeChange = (current, size) => {
    setPageSize(size)
    setPage(current)
    FetchProduct(current,size)
  };


  const FetchProduct = async (page,pageSize) => {
     const response =  await FetchAllProduct(page,pageSize,keyword,exploreProduct)
    setProduct(response.products);
    setTotal(response.total);
    setNewArrival(response.products[0].thumbnail)
    setNewArrival2(response.products[4].thumbnail)
    setNewArrival3(response.products[7].thumbnail)
    setTitle(response.products[0].title)
    setTitle2(response.products[4].title)
    setTitle3(response.products[7].title)
    
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

  <div className='mb-[40px] flex'>
    <span className='bg-[red] w-[10px] ml-[10px]'></span><h1 className='m-[20px] text-red-600 '>Categories</h1>
    </div> 
    <FetchCategories></FetchCategories>
  

<hr></hr>
          
<div className='flex'>
    <span className='bg-[red] w-[10px] ml-[10px]'></span><h1 className='m-[20px] text-red-600 '> New Arrival</h1>
    </div>
    
  <div className='flex justify-center'>

    <div className='border-1 rounded mr-[20px]'>
      <Image src={newArrival3} width={600}/>
      <p  className='text-center font-bold text-4xl'>{title3}</p>
      <p  onClick={()=>{
            navigate("/ProductDetail",{state:{productId:product[7].id,rating:product[7].rating}})
          }}  className='text-sky-500 cursor-pointer text-end mr-[10px]'>View detail</p>
    </div>


    <div className='flex flex-col   text-end'>
      <div className='border-1 rounded mb-[10px] '>
        <Image src={newArrival2}/>
        <p  className='text-center font-bold text-2xl'>{title2}</p>
        <p  onClick={()=>{
            navigate("/ProductDetail",{state:{productId:product[4].id,rating:product[4].rating}})
          }}  className='text-sky-500 cursor-pointer mr-[10px]'>View detail</p>
      </div>
    
      <div className='border-1 rounded'>
        <Image src={newArrival}/>
        <p  className='text-center font-bold text-2xl'>{title}</p>
        <p  onClick={()=>{
            navigate("/ProductDetail",{state:{productId:product[0].id,rating:product[0].rating}})
          }}  className='text-sky-500 cursor-pointer mr-[10px]'>View detail</p>
      </div>
    
    </div>
  </div>
  <hr></hr>

    <div className='flex'>
    <span className='bg-[red] w-[10px] ml-[10px]'></span><h1 className='m-[20px] text-red-600 '> Recommend products</h1>
    </div>
    <PaginationPage product ={product} explorProduct={exploreProduct}/>

    <div className='flex justify-center my-[20px]'>

    {exploreProduct ?  <Pagination
      onChange={onShowSizeChange}
      defaultCurrent={1}
      current ={page}
      total={total}
    /> :   <button className='w-[200px] bg-orange-500 h-[50px] rounded-full text-white hover:bg-red-800 ' onClick={()=>setExploreProduct(true)}>Explore all products</button>}
    </div>

    
 
  </div>
  )
}

export default Home
