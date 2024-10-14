import {useState,useEffect, useContext} from 'react';
import axios from 'axios';
import {useLocation,useNavigate,Link} from 'react-router-dom';
import { Image,Button,Card,Pagination,Rate } from 'antd';
import cartIcon from "./image/cart.png"
import { CartContext, CartContextType } from './useContext/useContext';
import UserContext, { UserContextType } from './useContext/user';
import { ProductItem } from './type/Product';


const ListProductByCategory = () => {
  const {addToCart,cart} = useContext(CartContext) as CartContextType; // ดึงค่ามาจาก useContext ในไฟล์ useContext 
  const {isLoggedIn,user,setUserId,updateUser,handleLogin} = useContext(UserContext)  as UserContextType; // ดึงค่ามาจาก useContext ในไฟล์ user 
  const navigate = useNavigate();
  const { Meta } = Card;
  const location = useLocation();
  const {category} = location.state || {}; //รับค่า keyword ผ่าน react-router-dom จากไฟล์ FetchCategories
  const [products,setProducts] = useState<ProductItem[]>(); // สร้าง useState เพื่อเก็บค่า product
  const [total,setTotal] = useState<number>(0); // สร้าง useState เพื่อเก็บค่า total
  const [page,setPage] = useState<number>(1); // สร้าง useState เพื่อเก็บค่า page
  const [pageSize,setPageSize] = useState<number>(10); // สร้าง useState เพื่อเก้บค่า pageSize

  const onShowSizeChange = (current:number, size:number) => { // UI Pagination ของ antd
    setPageSize(size);
    setPage(current);
  };

  const fetchProductByCategory = async(page:number,pageSize:number,category:string) =>{ // ฟังก์ชั่น Fetch ข้อมูลตาม Categories
    const skip = (page-1)*pageSize
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`,{
      params:{
        limit:pageSize,
        skip:skip
      }
    })  
    setProducts(response.data.products);  
    setTotal(response.data.total);
  }
  
  useEffect(()=>{ //เรียกใช้ fetchProductByCategory เมื่อ page,pageSize,category มีการเปลี่ยนแปลง
    fetchProductByCategory(page,pageSize,category)
    },[page,pageSize,category])

    const renderProduct = products?.map((product)=>{ // ประกาศตัวแปร renderProduct ทำการ render ข้อมูลใน product และนำมาแสดง
      return <div key={product.id} >
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<Image alt="Product picture" src={product.thumbnail} />}
          >
            <div onClick = {()=>{  
        navigate("/ProductDetail",{state:{productId:product.id}})
      }}>
        
           <Meta title={product.title}/>
           </div>
           <br/>
           Rating : <Rate disabled allowHalf defaultValue={product.rating}/>
            <br></br>
            <h1 className='text-lg font-bold'>Price : {product.price}$</h1>
            <div  className='flex justify-end' ><p  onClick={()=>{
            navigate(`/ProductDetail/${product.id}`,{state:{productId:product.id,rating:product.rating}})
          }}  className='text-sky-500 cursor-pointer'>View detail</p> </div>
            <hr></hr>    
            <Button   className='mt-[15px] mx-[5px]' onClick={()=>addToCart(product)}>Add to cart</Button>
            <Button  className='mt-[15px] mx-[5px]' onClick={()=> navigate("/Buypage",{state:{productId:product.id,rating:product.rating}})}>Buy</Button>
        </Card>
      </div>
    });
  
  return (
  <div>

      <div className=" flex justify-end pt-[30px] pb-[10px] px-[30px] items-center">
      
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

      <h1 className='text-center'>{category}</h1>
      <div className='px-[250px] grid  grid-cols-2 gap-4 justify-items-center my-[40px]'>
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