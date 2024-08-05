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

    //     }else if(page == 2){
    //         const response = await axios.get(`https://dummyjson.com/products`,{
    //             params:{
    //                     limit:pageSize,
    //                     skip: 10
    //             }
    //         })
    //         return response.data 
    //     }else if(page == 3){
    //         const response = await axios.get(`https://dummyjson.com/products`,{
    //             params:{
    //                     limit:pageSize,
    //                     skip: 20
    //             }
    //         })
    //         return response.data 
    //     }else if(page == 4){
    //         const response = await axios.get(`https://dummyjson.com/products`,{
    //             params:{
    //                     limit:pageSize,
    //                     skip: 30
    //             }
    //         })
    //         return response.data 
    //     }
      
    }



export default FetchAllProduct

