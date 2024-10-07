import { Image,Card,Carousel,Rate} from 'antd'
import { useContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { CartContext } from './useContext/useContext';
import MagnifyingGlass from "./image/Magnifyingglass.png"
import cartIcon2 from "./image/cartIcon2.png"
import axios from 'axios';
import shoppingIcon from "./image/shoppingIcon.png"

interface Product{ // กำหนดชุดข้อมูลเพื่อกำหนดชนิดตัวแปรให้กับ product
  id:number;
  title:string;
  price:number;
  rating:number;
  thumbnail:string;
};

interface propsType{ // กำหนดชุดข้อมูลเพื่อกำหนดชนิดข้อมูล props ที่ได้รับมา
  product:[];
  explorProduct:boolean;
  setPage:any;
  setExplorProduct:any;
 };

const PaginationPage:React.FC<propsType> = ({product,explorProduct,setPage,setExplorProduct}) => { // นำ propsType ที่ประกาศไว้ด้านบนมาใช้กับ props ที่ได้รับมา
  const {addToCart,setKeyword} = useContext(CartContext);
  const [randomProduct,setRandomProduct] = useState<Product[]>([]); // สร้าง useState มารับค่าข้อมูลสินค้าที่ทำการ Random
  const [query,setQuery] = useState<string>(''); //  สร้าง useState มารับค่าคีย์เวิร์ดที่ User ทำการป้อนในช่องค้นหาสินค้า
  const navigate = useNavigate();
  const { Meta } = Card;

  const contentStyle: React.CSSProperties = { // ปรับ Style ของ Carousel
    //width: '300px',
   // height: '230px',
    color: '#fff',
     //lineHeight: '20px',
    textAlign: 'center',
    //background: 'white',
  };


  const renderProduct = product.map((product:Product)=>{ // ทำการ Render product ที่ได้รับมาเป็น props จากหน้า Home และนำไปแสดงในส่วน JSX ที่อยู่ด้านล่าง
    return <div key={product.id} >
        <Card
        //  hoverable
          style={{ width: 240 }}
          cover={<Image alt={product.title} src={product.thumbnail} />}
        >
         
          <Meta title={product.title}/>
         
          <br/>
          <p className='text-lg font-bold'>Rate : <Rate disabled allowHalf defaultValue={product.rating}/></p>
          <p className='text-lg font-bold'>Price : {product.price}$</p>
          <div  className='flex justify-end' ><p  onClick={()=>{
            navigate("/ProductDetail",{state:{productId:product.id,rating:product.rating}})
          }}  className='text-sky-500 cursor-pointer'>View detail</p> </div>
          <hr></hr>
          
          <div className='grid grid-cols-3 justify-items-center'>
              <div className='flex font-bold items-center p-[5px] rounded-xl  transition hover:scale-105  active:bg-cyan-500 active:text-white border border-1  col-span-2 cursor-pointer mr-[5px]' onClick={()=>{addToCart(product)}}>
                  <div>Add to cart</div>
                  <img src={cartIcon2} width={30} className='ml-[5px]'></img>
              </div>
              <div className='flex font-bold items-center p-[5px] rounded-xl transition hover:scale-105 active:bg-amber-400 active:text-white border border-1 cursor-pointer' onClick={()=> navigate("/Buypage",{state:{productId:product.id,rating:product.rating}})}>
                  <div>Buy</div>
                  <img src={shoppingIcon} width={30} className='ml-[5px]'></img>
              </div>
          </div>
  
          
            
          
      </Card>
     
    </div>
  });

  const handleOnSubmit = (e:any) =>{ // เมื่อ User กด Submit ทำให้เกิด Event ที่กำหนดไว้
    e.preventDefault();
    setKeyword(query);
    setPage(1);
    setExplorProduct(true);
   }
   
   const handleOnChange = (e:any) => { // เมื่อ User ป้อนข้อมูลกำหนดให้ query มีค่าเท่ากับข้อมูลที่ User ป้อนในช่อง input
      setQuery(e.target.value);  
   }

  const showRandomProduct = async () =>{ // เป็นฟังก์ชั่นสำหรับ Fetch ข้อมูลสินค้าและทำการ Random สินค้าที่ต้องการแสดง
        
        const response = await axios.get(`https://dummyjson.com/products`,{
            params:{
                    
                    limit: 10,
                    skip: Math.floor(Math.random()*194)
            }
        })
        setRandomProduct(response.data.products)
      }   
      
useEffect(()=>{ // เรียกใช้ showRandomProduct ทุกครั้งเมื่อมีเข้าหน้าเว็บเพจ
  showRandomProduct()
},[])


  return (
    <div>
      
      <Carousel arrows autoplay >
        {randomProduct.map((product:Product)=>(
          <div key={product.id} className='mt-[20px]'>
            <h3 style={contentStyle} className=' flex flex-col items-center rounded bg-red-800'><Image src={product.thumbnail} width={300} />
          <p className='cursor-pointer text-xl' onClick={()=>{
            navigate("/ProductDetail",{state:{productId:product.id,rating:product.rating}})
          }}> {product.title} </p>
          <p>Price : {product.price}$</p>
         
          <p> Rating : <Rate disabled  allowHalf defaultValue={product.rating}/></p>
            </h3>
          </div>
        ))}
      </Carousel>   
      <hr className='mt-[40px]'></hr>

       <div className='flex'>
       <span className='bg-[red] w-[10px] ml-[10px]'></span><h1 className='m-[20px] text-red-600 '>See our products</h1>
        </div> 
        <form onSubmit = {handleOnSubmit} className=' flex justify-center m-[20px]'> 
            <input className = 'rounded-xl text-center bg-slate-100  w-[500px] p-[10px] mr-[5px] outline-none' placeholder='What are you looking for ?' onChange ={handleOnChange}></input>
            <button><img src={MagnifyingGlass} className='w-[20px]'></img></button> 
        </form>
        {explorProduct ?<div className='px-[250px] grid  grid-cols-2 gap-4 justify-items-center'>
          {renderProduct}
        </div> : <div className='grid grid-cols-4 gap-4 justify-items-center'>{renderProduct}</div> }  
        </div>     
  );
}

export default PaginationPage
