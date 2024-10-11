import axios from "axios"
import {useState,useEffect} from "react" 
import {useNavigate} from 'react-router-dom'
import beauty from "./image/beauty.png"
import fragrances from "./image/fragrance.png"
import furniture from "./image/furniture.png"
import kitchenaccessories from "./image/kitchen-accessories.png"
import groceries from "./image/groceries.png"
import homedecoration from "./image/homedecoration.png"
import laptops from "./image/laptops.png"
import mensshirts from "./image/mensshirts.png"
import mensshoes from "./image/mensshoes.png"
import menswatches from "./image/menswatches.png"
import mobileaccessories from "./image/mobileaccessories.png"
import motorcycle from "./image/motorcycle.png"
import skincare from "./image/skincare.png"
import smartphones from "./image/smartphones.png"
import sportsaccessories from "./image/sportsaccessories.png"
import sunglasses from "./image/sunglasses.png"
import tablets from "./image/tablets.png"
import tops from "./image/tops.png"
import vehicle from "./image/vehicle.png"
import womensbags from "./image/womensbags.png"
import womensdresses from "./image/womensdresses.png"
import womensjewellery from "./image/tablets.png"
import womensshoes from "./image/tablets.png"
import womenswatches from "./image/womenswatches.jpg"


const FetchCategories =  () =>{

  const svgMap = { // กำหนดรูปให้มีชื่อตรงกับ category เพื่อนำไปแสดง
    beauty,
    fragrances,
    furniture,
    groceries,
    homedecoration,
    kitchenaccessories,
    laptops,
    mensshirts,
    mensshoes,
    menswatches,
    mobileaccessories,
    motorcycle,
    skincare,
    smartphones,
    sportsaccessories,
    sunglasses,
    tablets,
    tops,
    vehicle,
    womensbags,
    womensdresses,
    womensjewellery,
    womensshoes,
    womenswatches
  };

    const navigate = useNavigate();
    const [category,setCategory] = useState<string[]>([]); // สร้าง useState เพื่อเก็บค่า category
    const [seeMore,setSeeMore] = useState(false); 
    
    const fetchAPICategories = async () =>{ // Fetch Category ทั้งหมด
      
      const response = await axios.get('https://dummyjson.com/products/category-list');
      setCategory(response.data);
     
    };
  
    useEffect(()=>{ // เรียกใช้ fetchAPICategories 
     fetchAPICategories();
    },[]);
      
  
 

  return (

    <div>
       {!seeMore ? <div onClick={()=>setSeeMore(true)} className="text-end pr-[40px] pb-[40px] text-sky-500 cursor-pointer hover:underline">See more</div> : <div onClick={()=>setSeeMore(false)} className="text-end pr-[40px] pb-[40px] text-sky-500 cursor-pointer hover:underline">Hide</div>}
      <div  className={`${!seeMore ? 'grid grid-cols-8 justify-items-center h-40 gap-y-3 overflow-hidden ' :  'grid grid-cols-8 grid-rows-3 gap-3 justify-items-center text-center'}`}>
         
          {category.map((item,index)=>(
            
          <div key={index} onClick = {()=>{navigate("/ListProductByCategory",{state:{category:item}})}} className="flex  flex-col items-center hover:bg-slate-300 border rounded text-center cursor-pointer w-[100px]  p-[5px] ">
          <img src={svgMap[(item.replace(/-/g,'') as keyof typeof svgMap)]} alt={item} className={`${!seeMore ? 'w-[80px]' : 'w-[50px]'}`}></img>
        <p>{item}</p>
        
          </div>
          ))}
          
      </div>
    </div>
  )
}

export default FetchCategories