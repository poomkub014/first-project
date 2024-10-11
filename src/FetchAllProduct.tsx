import axios from 'axios'

    const FetchAllProduct = async (page:number,pageSize:number,keyword:string,exploreProduct:boolean) =>{ //เป็นฟังก์ชั่นสำหรับ Fetch ข้อมูลสินค้าทั้งหมด
        if (exploreProduct) { // ในกรณีที่ exploreProduct = true 
            if(!keyword){ // ในกรณีที่ exploreProduct = true และไม่มี keyword
            
                const skip = (page-1) * pageSize;
           
                const response = await axios.get(`https://dummyjson.com/products`,{
                    params:{
                            
                            limit: pageSize,
                            skip: skip
                    }
                })
                
                return response.data;
                
            }else{ // ในกรณีที่ exploreProduct = true และมี keyword
                const skip = (page-1) * pageSize;
           
                const response = await axios.get(`https://dummyjson.com/products/search`,{
                    params:{
                            q:keyword,
                            limit: pageSize,
                            skip: skip
                    }
                })
                
                return response.data;
                
            }
            
        }else{ // ในกรณีที่ exploreProduct != true 
           
           if(!keyword){ // ในกรณีที่ exploreProduct != true และไม่มี keyword
            
            const response = await axios.get(`https://dummyjson.com/products`,{
                params:{
                        
                        limit: 8,
                        skip: 0
                }
            })
            
            return response.data;
            
        }else{ // ในกรณีที่ exploreProduct != true และมี keyword
            const skip = (page-1) * pageSize;
       
            const response = await axios.get(`https://dummyjson.com/products/search`,{
                params:{
                        q:keyword,
                        limit: pageSize,
                        skip: skip
                }
            })
            
            return response.data;
            
        }
           
        }  
            }

export default FetchAllProduct

