import { useNavigate } from 'react-router-dom';

const FinalPage = () => { 
   
    const navigate = useNavigate(); 

    setTimeout(() => { // เมื่อครบ 3 วินาทีจะนำทางไปยังหน้าแรก
        navigate("/")
        }, 3000);
    
     
  return (

    <div className='flex justify-center items-center h-screen'>
        <div className='bg-[gray]  p-[100px]'>
            <p className='text-3xl'>
            Thank you for your purchase we will send product to according your address
            </p>       
        </div>  
    </div>
  )
}

export default FinalPage