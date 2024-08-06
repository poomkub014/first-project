import axios from "axios"
import React,{useState,useEffect} from "react" 
import {useNavigate,Link} from 'react-router-dom'
import ListProductByCategory from './ListProductByCategory.tsx'

const FetchCategories =  () =>{
    const navigate = useNavigate();
    const [category,setCategory] = useState([])
    const [selectCategory,setSelectCategory] = useState('')
    const [nameCategory,setNameCategory] = useState('')
    
    const fetchAPICategories = async () =>{
      
      const response = await axios.get('https://dummyjson.com/products/category-list')
      setCategory(response.data)
      console.log(response.data)
    }
  
    useEffect(()=>{
     fetchAPICategories()
    },[])
      
   
  
  return (
    <div>
    
      
      {category.map((item,index)=>(
      <div key={index} onClick = {()=>{
       setNameCategory(item)
       
       navigate("/ShowProductByCategory",{state:{keyword:item}})
      }}>
      {item}
      </div>
   
      ))}
         <ListProductByCategory keyword ={nameCategory}/>
    
    
    </div>
  )
}

export default FetchCategories