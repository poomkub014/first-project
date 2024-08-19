import React, { useState,useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "./useContext/user";

const Login = () => {
const {updateUser,handleLogin,setUserId,userId} = useContext(UserContext);
const [username,setUsername] = useState('')
const [password,setPassword] = useState('')

const navigate = useNavigate();

const handleOnSunmit = (e:any) =>{
    e.preventDefault()
    console.log(`this is username : ${username}`);
    console.log(`this is password : ${password}`); 
  
     
      
    const login = async () => {
        if(username && password){
         try{
            const response = await axios.post(`https://dummyjson.com/user/login`,{   
                    username:username,
                    password:password        
            },{
              headers:{
                'Content-Type':'application/json'
              }
            })      
          
            console.log(response.data);
            setUserId(response.data.id)
             

    }catch(error){
     alert('Log in fail',error)
   
    }                      
      
        
}else{
       alert('enter username or password')
      }
      
}

login()
}

useEffect(()=>{
  const fetchUser = async (id) =>{
    const response = await axios.get (`https://dummyjson.com/users/${id}`)  
             handleLogin(true)
             alert('Log in success')
             navigate("/")
    console.log(response.data.address.address)
    updateUser({firstName: response.data.firstName, 
      lastName:response.data.lastName, 
      address:response.data.address.address,
      city:response.data.address.city,
      state:response.data.address.state,
      postalCode:response.data.address.postalCode,
      phone:response.data.phone
     })
  }
  fetchUser(userId)
},[userId])


   
  return (
    <div className="flex justify-center">
        <form onSubmit={handleOnSunmit}>
          <div className="bg-slate-50 rounded flex flex-col p-[20px] ">
                <span className="my-[10px]">Username</span>
                <input type="usename" onChange={(e)=>{setUsername(e.target.value)}} className="my-[10px]" placeholder="Enter Username"></input>
                <span className="my-[10px]">Password</span>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password"></input>
                <button  className="my-[10px] bg-[red]">เข้าสู่ระบบ</button>
          </div>
        </form>
    </div>
  )
}

export default Login