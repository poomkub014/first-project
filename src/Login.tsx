import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Login = () => {
const [username,setUsername] = useState('')
const [password,setPassword] = useState('')
const [token,setToken] = useState('')

const handleOnSunmit = (e:any) =>{
    e.preventDefault()
    console.log(`this is username : ${username}`);
    console.log(`this is password : ${password}`); 
    if (username && password) {
        const login = async () => {
            const response = await axios.post(`https://dummyjson.com/user/login`,{   
              
              
                    username:username,
                    password:password        
            },{
              headers:{
                'Content-Type':'application/json'
              }
            })      
            setToken(response.data.token);  
            console.log(response);
            
                  
    }
    login()

    
}
}

   
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