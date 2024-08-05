import axios from 'axios'


    const FetchAllProduct = async (page,pageSize) =>{

        const skip = (page-1) * pageSize;

       
            const response = await axios.get(`https://dummyjson.com/products`,{
                params:{
                        limit: pageSize,
                        skip: skip
                }
            })
            
            return response.data
            
            }

export default FetchAllProduct

       export const Search = async (keyword) =>{
           
           const response = await axios.get(`https://dummyjson.com/products`,{
                params:{
                        q:keyword
                }
            })
            return response.data      
            
       } 
