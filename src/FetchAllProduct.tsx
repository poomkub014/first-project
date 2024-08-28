import axios from 'axios'


    const FetchAllProduct = async (page,pageSize,keyword,exploreProduct) =>{
        if (exploreProduct) {
            if(!keyword){
            
                const skip = (page-1) * pageSize;
           
                const response = await axios.get(`https://dummyjson.com/products`,{
                    params:{
                            
                            limit: pageSize,
                            skip: skip
                    }
                })
                
                return response.data
                
            }else{
                const skip = (page-1) * pageSize;
           
                const response = await axios.get(`https://dummyjson.com/products/search`,{
                    params:{
                            q:keyword,
                            limit: pageSize,
                            skip: skip
                    }
                })
                
                return response.data
                
            }
            
        }else{
           
           if(!keyword){
            
            //const skip = (page-1) * pageSize;
       
            const response = await axios.get(`https://dummyjson.com/products`,{
                params:{
                        
                        limit: 6,
                        skip: 0
                }
            })
            
            return response.data
            
        }else{
            const skip = (page-1) * pageSize;
       
            const response = await axios.get(`https://dummyjson.com/products/search`,{
                params:{
                        q:keyword,
                        limit: pageSize,
                        skip: skip
                }
            })
            
            return response.data
            
        }
           
        }  
            }

export default FetchAllProduct

//       export const Search = async (keyword) =>{
//          
//           const response = await axios.get(`https://dummyjson.com/products/search`,{
//                params:{
//                        q:keyword
//                        
//                        
//                        
//                        
//                }
//            })
//            return response.data      
//            
//       } 
