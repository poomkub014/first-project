import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import login from "./image/Login.png"
import createAccount from "./image/createAccount.jpg"

const CreateAccount = () => {
  const [username,setUsername] = useState<string>(''); // สร้าง useState เพื่อเก็บค่า Username จากฟอร์มที่ User ป้อน
  const [password,setPassword] = useState<string>(''); // สร้าง useState เพื่อเก็บค่า Password จากฟอร์มที่ User ป้อน
  const [firstName,setFirstName] = useState<string>(''); // สร้าง useState เพื่อเก็บค่า Firstname จากฟอร์มที่ User ป้อน
  const [lastName,setLastName] = useState<string>(''); // สร้าง useState เพื่อเก็บค่า Lastname จากฟอร์มที่ User ป้อน
  const [address,setAddress] = useState<string>(''); // สร้าง useState เพื่อเก็บค่า Address จากฟอร์มที่ User ป้อน
  const [city,setCity] = useState<string>(''); // สร้าง useState เพื่อเก็บค่า City จากฟอร์มที่ User ป้อน
  const [state,setState] = useState<string>(''); // สร้าง useState เพื่อเก็บค่า State จากฟอร์มที่ User ป้อน 
  const [postalCode,setPostalCode] = useState<string>(''); // สร้าง useState เพื่อเก็บค่า Postalcode จากฟอร์มที่ User ป้อน
  const [phone,setPhone] = useState<string>(''); // สร้าง useState เพื่อเก็บค่า Phone จากฟอร์มที่ User ป้อน
  const navigate = useNavigate();

  const handleOnSubmit = (e:any) =>{ // เมื่อ User ทำการ Submit จะทำการส่งข้อมูลที่ User ป้อน ไปยัง Server เพื่อ Add new user
    e.preventDefault();

    const register =  async () =>{

        if (username && password && firstName && lastName && address && city && state && postalCode && phone) {  
            await axios.post(`https://dummyjson.com/users/add`,{
              username,
              password,
              firstName,
              lastName,
              address:{
                address,
                city,
                state,
                postalCode
              },
              phone
        },{
          headers:{
            'Content-Type':'application/json'
          }
        })
      alert('Registor success.')
          setTimeout(() => {
            navigate("/Login")
          }, 2000);
        
    }else{
      alert('Please fill empty information.')
    }

    }
    register()
   };

  


  return (
    <div>

      <div className="flex justify-center mt-[40px]">
      <img src={login} className="w-[80px]"></img>
      </div>
     

      <div className="grid grid-cols-2 items-center">

          <div className="justify-self-end">
              <img src={createAccount}></img>
          </div>

          <div className="flex justify-center">

           
          <div className="w-[500px]">
            <h1 className='text-center'>Create an account</h1>
            <form onSubmit={handleOnSubmit} className='flex flex-col my-[30px]'>
                <span className="my-[10px]">Firstname</span>
                <input type="text"  placeholder="Enter Firstname" onChange={(e)=> setFirstName(e.target.value)} value={firstName}/>
                <hr className="my-[10px]"></hr>

                <span className="my-[10px]">Lastname</span>
                <input type="text" placeholder="Enter Lastname" onChange={(e)=> setLastName(e.target.value)}/>
                <hr className="my-[10px]"></hr>

                <span className="my-[10px]">Username</span>
                <input type="text"  placeholder="Enter Username" onChange={(e)=> setUsername(e.target.value)}/>
                <hr className="my-[10px]"></hr>

                <span className="my-[10px]">Password</span>
                <input type="password"  placeholder="Enter Password" onChange={(e)=> setPassword(e.target.value)}/>
                <hr className="my-[10px]"></hr>

                <span className="my-[10px]">Address</span>
                <input type="text"  placeholder="Enter Address" onChange={(e)=> setAddress(e.target.value)}/>
                <hr className="my-[10px]"></hr>

                <span className="my-[10px]">City</span>
                <input type="text"  placeholder="Enter City" onChange={(e)=> setCity(e.target.value)}/>
                <hr className="my-[10px]"></hr>

                <span className="my-[10px]">State</span>
                <input type="text"  placeholder="Enter State" onChange={(e)=> setState(e.target.value)}/>
                <hr className="my-[10px]"></hr>

                <span className="my-[10px]">Postal code</span>
                <input type="text" pattern="[0-9]*" placeholder="Enter Postal code" onChange={(e)=> setPostalCode(e.target.value)}/>
                <hr className="my-[10px]"></hr>

                <span className="my-[10px]">Phone</span>
                <input type="text" pattern="[0-9]*" placeholder="Enter Phone" onChange={(e)=> setPhone(e.target.value)}/>
                <hr className="my-[10px]"></hr>
                
                <div className='flex justify-around my-[10px]'>
                <button className='bg-[red] h-[40px] w-[100px] rounded-full text-white'>Confirm</button>
                <button  className='bg-yellow-400 h-[40px] w-[100px] rounded-full text-white' onClick={()=> navigate("/Login")}>Back</button>
                </div>
              </form> 
          </div>
         
        
    </div>

      </div>

  </div>
  )
}

export default CreateAccount