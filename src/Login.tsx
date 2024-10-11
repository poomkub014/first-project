import { useState,useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "./useContext/user";
import login from "./image/Login.png"
import login2 from "./image/Login2.avif"

const Login = () => {
const {updateUser,handleLogin,setUserId,userId}:any = useContext(UserContext); // ดึงค่ามาจาก useContext ในไฟล์ user 
const [username,setUsername] = useState(''); // สร้าง useState เพื่อเก็บค่า username
const [password,setPassword] = useState(''); // สร้าง useState เพื่อเก็บค่า password
const navigate = useNavigate();

const handleOnSubmit = (e:any) =>{ // ฟังก์ชั่น เมื่อ user มีการป้อนข้อมูล จะทำการเรียกใช้ฟังก์ชั่น login
    e.preventDefault();   
      
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
                setUserId(response.data.id)
          }catch(error){
                alert('Log in fail')
          }                      
        }else{
              alert('Enter username or password')
              }
      
    }

login()
}

useEffect(()=>{ // ถ้าหากมี userId จะทำการเรียกใช้ fetchUser ทุกครั้งที่มี userId มีการเปลี่ยนแปลง
  if(userId){
    const fetchUser = async (id:number) =>{
      if (id) {
              const response = await axios.get (`https://dummyjson.com/users/${id}`);
               handleLogin(true);
               alert('Log in success');
               navigate("/");
              updateUser({firstName: response.data.firstName, 
              lastName:response.data.lastName, 
              address:response.data.address.address,
              city:response.data.address.city,
              state:response.data.address.state,
              postalCode:response.data.address.postalCode,
              phone:response.data.phone,
              image:response.data.image
                });
      }
      
    }
    fetchUser(userId)
  }
},[userId])

  return (
    <div>
      <div className="flex justify-center mt-[40px]">
        <img src={login} className="w-[80px]"></img>
      </div>

      <div className="grid grid-cols-2 items-center">
          <div className="justify-self-end">
              <img src={login2}></img>
          </div>

          <div className="flex justify-center">
              <form onSubmit={handleOnSubmit} className="w-[500px] text-center">
                <h1>Log in</h1>
                    <div className="flex flex-col p-[20px] ">
                    
                    <input type="usename" onChange={(e)=>{setUsername(e.target.value)}}  placeholder="Username" className="h-[30px] outline-none"></input>
                    <hr className="mt-[10px] mb-[20px]"></hr>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="h-[30px] outline-none"></input>
                    <hr className="mt-[10px] mb-[20px]"></hr>
                    <button  className="my-[10px] bg-[red] h-[50px] rounded-full text-white">Log in</button>
                    <div className="flex justify-end">
                        
                        <p  className='text-sky-500 cursor-pointer' onClick={()=>{navigate("/CreateAccount")}}>Create an account?</p>
                    </div> 
                    <span className="font-bold text-red-500">*This is username and password for test my webapp</span>
                    <span> Username : emilys</span>
                    <span>Password : emilyspass </span>
              </div>
            </form>
          </div>
      </div>    
    </div>
  )
}

export default Login