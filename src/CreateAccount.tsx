import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateAccount = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [address,setAddress] = useState('')
  const [city,setCity] = useState('')
  const [state,setState] = useState('')
  const [postalCode,setPostalCode] = useState('')
  const [phone,setPhone] = useState('')
  const navigate = useNavigate();

  const handleOnSubmit = (e:any) =>{
    e.preventDefault();
    console.log(firstName)

    const register =  async () =>{

        if (username && password && firstName && lastName && address && city && state && postalCode && phone) {  
            const response = await axios.post(`https://dummyjson.com/users/add`,{
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
      alert('สมัครสมาชิกเรียบร้อย')
          setTimeout(() => {
            navigate("/Login")
          }, 2000);
        
    }else{
      alert('กรุณาระบุข้อมูลให้ครบ')
    }

    }
    register()
   }

  


  return (
    <div className="flex justify-center">
        <form onSubmit={handleOnSubmit}>
          <div className="bg-slate-50 rounded flex flex-col p-[20px] ">
                <span className="my-[10px]">Firstname</span>
                <input type="text"  placeholder="Enter Firstname" onChange={(e)=> setFirstName(e.target.value)} value={firstName}/>

                <span className="my-[10px]">Lastname</span>
                <input type="text" placeholder="Enter Lastname" onChange={(e)=> setLastName(e.target.value)}/>

                <span className="my-[10px]">Username</span>
                <input type="text"  placeholder="Enter Username" onChange={(e)=> setUsername(e.target.value)}/>

                <span className="my-[10px]">Password</span>
                <input type="password"  placeholder="Enter Password" onChange={(e)=> setPassword(e.target.value)}/>

                <span className="my-[10px]">Address</span>
                <input type="text"  placeholder="Enter Address" onChange={(e)=> setAddress(e.target.value)}/>

                <span className="my-[10px]">City</span>
                <input type="text"  placeholder="Enter City" onChange={(e)=> setCity(e.target.value)}/>

                <span className="my-[10px]">State</span>
                <input type="text"  placeholder="Enter State" onChange={(e)=> setState(e.target.value)}/>

                <span className="my-[10px]">Postal code</span>
                <input type="text" pattern="[0-9]*" placeholder="Enter Postal code" onChange={(e)=> setPostalCode(e.target.value)}/>

                <span className="my-[10px]">Phone</span>
                <input type="text" pattern="[0-9]*" placeholder="Enter Phone" onChange={(e)=> setPhone(e.target.value)}/>

                <div className='flex justify-around my-[10px]'>
                <button className='bg-[red]'>ยืนยัน</button>
                <button  className='bg-[red]' onClick={()=> navigate("/Login")}>ย้อนกลับ</button>
                </div>
                
          </div>
        </form>
        
    </div>
  )
}

export default CreateAccount