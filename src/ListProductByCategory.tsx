import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom'

const ListProductByCategory = () => {
  const location = useLocation();
  const {keyword} = location.state || {};
  
  const fetchProductByCategory = async(keyword) =>{
    const response = await axios.get(`https://dummyjson.com/products/category/${keyword}`)
    console.log(response.data.total)
  }
  
  useEffect(()=>{
    fetchProductByCategory(keyword)
    },[keyword])
  
  return (
    <div>This is Category Page {keyword}</div>
  )
  
}
export default ListProductByCategory