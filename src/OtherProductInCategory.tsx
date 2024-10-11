import {useState,useEffect} from "react"; 
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { Card,Image,Rate } from "antd";

interface Category{ //กำหนดชุดข้อมูลเพื่อกำหนดชนิดตัวแปรให้กับ category
  id:number;
  price:number;
  title:string;
  rating:number;
  thumbnail:string;
}
const OtherProductInCategory = ({category}:any) => { // รับ props {category} มาจากไฟล์ ProductDetail หรือ ProductDetail2
    const navigate = useNavigate();
    const [categoryProduct,setCategoryProduct] = useState<Category[]>([]); // สร้าง useState เพื่อเก็บข้อมูลสินค้าตามรายการ Category
    const { Meta } = Card;

    const fetchCategoryProduct = async () =>{
        const response = await axios.get(`https://dummyjson.com/products/category/${category}`, { 
          params:{           
          limit:4,
          
  }
        }
  )
        setCategoryProduct(response.data.products);
        
      };
 
    useEffect(()=>{ // เรียกใช้ fetchCategoryProduct เมื่อ category มีการเปลี่ยนแปลง
      if (category) {
        fetchCategoryProduct();
      };  
      },[category]);



    const categoryProducts = categoryProduct.map((category:Category,index)=>{
        return <div key={index}>
          <Card
                hoverable
                style={{ width: 240 }}
                cover={<Image alt={category.title} src={category.thumbnail} />}
              >
          <div onClick={()=>{navigate("/ProductDetail",{state:{productId:category.id,rating:category.rating}}),window.location.reload()}}>
                    <Meta title={category.title} />
                  <br/>
                  <span className='text-lg font-bold'>Rate : <Rate disabled allowHalf defaultValue={category.rating}/></span>
                  <span className='text-lg font-bold'>Price : {category.price}$</span>
          </div>
              
          </Card>
  
        </div>
      })

    return   (

  <div>
    <div className=" p-[30px]">
      <h1 className="text-[red]">Other products in category</h1>
      <div className='grid grid-cols-4 justify-items-center mt-[20px]'> 
      {categoryProducts}
      </div>
    </div>    
  </div>
  
    )

}

export default OtherProductInCategory