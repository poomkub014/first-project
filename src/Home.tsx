import { useEffect, useState ,useContext} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { Button ,Pagination,Image } from 'antd'
import PaginationPage from './Pagination'
import FetchAllProduct from './FetchAllProduct'
import FetchCategories from './FetchCategories'
import UserContext, { UserContextType } from './useContext/user.tsx'
import { CartContext, CartContextType } from './useContext/useContext.tsx'
import logo from './image/logo.jfif'
import axios from 'axios'
import cartIcon from "./image/cart.png"
import { ProductItem } from './type/Product.ts'




interface NewArrival{ // กำหนดชุดข้อมูลเพื่อกำหนดชนิดตัวแปรให้กับ newArrival
  thumbnail:string;
  title:string;
}

const Home =() => {
  const [page,setPage] = useState(1); // สร้าง useState เพื่อกำหนดค่าให้กับหน้าปัจจุบัน (เพื่อใช้กับ Pagination ของ antd)
  const [pageSize,setPageSize] = useState(10); //สร้าง useState เพื่อกำหนดค่าให้กับจำนวนของรายการสินค้าที่ต้องการโชว์ในแต่ละหน้า (เพื่อใช้กับ Pagination ของ antd)
  const [total,setTotal] = useState(194); //สร้าง useState เพื่อรับค่าจำนวนรายการสินค้าทั้งหมด (เพื่อใช้กับ Pagination ของ antd)
  const [product,setProduct] = useState<ProductItem[]>([]); //สร้าง useState เพื่อรับค่าจากการ Fetch API ของรายการสินค้าทั้งหมด
  const [exploreProduct,setExploreProduct] = useState<boolean>(false); //สร้าง useState เพื่อกำหนดค่าเมื่อผู้ใช้คลิกปุ่ม exploreProduct
  const [newArrival,setNewArrival] = useState<NewArrival | undefined>(); //สร้าง useState เพื่อรับค่าสินค้าใหม่ 1 จากการ Fetch API
  const [newArrival2,setNewArrival2] = useState<NewArrival>(); //สร้าง useState เพื่อรับค่าสินค้าใหม่ 2 จากการ Fetch API
  const [newArrival3,setNewArrival3] = useState<NewArrival>(); //สร้าง useState เพื่อรับค่าสินค้าใหม่ 3 จากการ Fetch API
  const  {user,updateUser,isLoggedIn,handleLogin,setUserId} = useContext(UserContext) as  UserContextType; // ดึงค่ามาจาก useContext ในไฟล์ user 
  const {keyword,cart} = useContext(CartContext) as CartContextType; // ดึงค่ามาจาก useContext ในไฟล์ useContext
  const navigate = useNavigate(); // คำสั่งของ React-router-dom เป็นคำสั่งนำทางไปยังหน้าต่างๆที่เราต้องการ
 
  const onShowSizeChange = (current:number, size:number) => { //เป็น UI Pagination ของ antd
    setPageSize(size);
    setPage(current);
  };

  const FetchProduct = async () => {  //เป็นฟังก์ชั่นสำหรับ Fetch ข้อมูลสินค้าทั้งหมด
     const response =  await FetchAllProduct(page,pageSize,keyword,exploreProduct)
    setProduct(response.products);
    setTotal(response.total);
    
  }

  const newProduct =  async() =>{ //เป็นฟังก์ชั่นสำหรับ Fetch ข้อมูลสินค้าใหม่
    const response = await axios.get(`https://dummyjson.com/products`,{
      
    })
    setNewArrival(response.data.products[0])
    setNewArrival2(response.data.products[4])
    setNewArrival3(response.data.products[7])
    
  }
  useEffect(()=>{ //คำสั่ง useEffect เพื่อทำการเรียก FetchProduct(); และ newProduct(); เมื่อ page,pageSize,keyword,exploreProduct มีการเปลี่ยนแปลง
  FetchProduct();
  newProduct();
  },[page,pageSize,keyword,exploreProduct]);
    
  return (
    <div>
      {/* <div className='bg-red-600 w-[100%]  h-[80px]  '></div> */}

      <div className='grid grid-cols-3 items-center p-[20px]'> 

      <div>
        <img src={logo} className='rounded w-[100px]'></img>
      </div>

      <div>
        <h2 className='text-center text-[red]'>E-Commerce Website</h2>
      </div>

        <div className=" flex justify-end items-center">
            {isLoggedIn && <img src= {user.image}  width={40}/>}<div className='mx-[10px]  text-xl '>{user.firstName} {user.lastName}</div> 

            {isLoggedIn ?  <Button className='mx-[10px]' onClick={()=>{   
                window.location.reload();
                updateUser({firstName:'Guest'});
                handleLogin(false);
                setUserId(null);
              }}>Logout</Button> : <Button className='mx-[10px]'><Link to ="/Login">Sign Up</Link></Button> }    
            <div className = 'cursor-pointer text-center flex items-center' onClick={()=>navigate("/cart")}>
            <img src={cartIcon} width={40} />
            {cart.length > 0 &&<span className='text-lg   text-red-500 font-bold'>{cart.length}</span>}
            </div>       
          </div>   
      </div>
        
          {/* <div className=' flex justify-self-center '>
            <p className=' font-bold text-xl'>Home</p>
            <p className='mx-[20px] font-bold text-xl'>Contact</p>
            <p className='font-bold text-xl'>About</p>
          </div> */}
          
          
 

    <hr></hr>

  <div className='my-[20px] flex'>
    <span className='bg-[red] w-[10px] ml-[10px]'></span><h1 className='m-[20px] text-red-600'>Categories</h1>
    </div> 
    <FetchCategories></FetchCategories> 
  

<hr></hr>
          
<div className='flex'>
    <span className='bg-[red] w-[10px] ml-[10px]'></span><h1 className='m-[20px] text-red-600 '> New Arrival</h1>
    </div>
    
  <div className='flex justify-center items-cneter '>
          <div className='flex items-center'>
          <div className='border-1 rounded mr-[20px]'>
      <Image src={newArrival3?.thumbnail} width={400}/>
      <p  className='text-center font-bold text-4xl'>{newArrival3?.title}</p>
      <p  onClick={()=>{
            navigate("/ProductDetail",{state:{productId:product[7].id,rating:product[7].rating}})
          }}  className='text-sky-500 cursor-pointer text-end mr-[10px]'>View detail</p>
    </div>

          </div>
    

    <div className='text-end flex flex-col w-[200px]'>
      <div className='border-1 rounded mb-[10px] '>
        <Image src={newArrival2?.thumbnail} width={200}/>
        <p  className='text-center font-bold text-2xl'>{newArrival2?.title}</p>
        <p  onClick={()=>{
            navigate("/ProductDetail",{state:{productId:product[4].id,rating:product[4].rating}})
          }}  className='text-sky-500 cursor-pointer mr-[10px]'>View detail</p>
      </div>
    
      <div className='border-1 rounded'>
        <Image src={newArrival?.thumbnail} width={200}/>
        <p  className='text-center font-bold text-2xl'>{newArrival?.title}</p>
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

    <PaginationPage product ={product} explorProduct={exploreProduct} setPage = {setPage} setExplorProduct = {setExploreProduct}  />

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
