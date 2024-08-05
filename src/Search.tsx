import React,{useState} from "react";
import Axios from "axios"



const SearchProduct = ({searchProduct}) => {
  const [keyword,setKeyword] = useState("")
  
  const handleOnSubmit = (e) =>{
   e.preventDefault()
 searchProduct(keyword)
   
  }
  
  const handleOnChange = (e) => {
    setKeyword(e.target.value)
    console.log(keyword)
  }
  
  return (
    
    
      <form onSubmit = {handleOnSubmit}>
        <input className = 'w-[200px] bg-[red]' onChange={handleOnChange} value = {keyword} />
    
      </form> 
    
  )
}
export default SearchProduct

