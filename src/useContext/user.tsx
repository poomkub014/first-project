import React,{createContext,ReactNode,useEffect,useState} from "react";

interface User{
    firstName?:string;
    lastName?:string,
    address?:string,
    city?:string,
    state?:string,
    postalCode?:string,
    phone?:string ,
    image?:string      
}

export interface UserContextType {
    user:User;
    updateUser : (newUser:User) => void;
    handleLogin : (status:boolean) => void;
    isLoggedIn : boolean;
    setUserId : React.Dispatch < React.SetStateAction <number | null> >;
    userId : number | null;
}
 const UserContext = createContext<UserContextType| undefined>(undefined);

 interface UserProviderProps {
    children : ReactNode;
 }

 
export const UserProvider = ({children}:UserProviderProps) =>{
    const [user,setUser] = useState<User>({ // สร้าง useState เพื่อเก็บข้อมูลลูกค้าที่ทำการ Login
        firstName:'Guest',
        lastName:'',
        address:'',
        city:'',
        state:'',
        postalCode:'',
        phone:'' ,
        image:''       
    });
    const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false); // สร้าง useState เพื่อเก็บสถานะการ Login
    const [userId,setUserId] = useState<number | null>(null); // สร้าง useState เพื่อเก็บ ID ของลูกค้าที่ทำการ Login
   
useEffect(()=>{
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') // เป็นคำสั่งในการดึงค่า สถานะการ Login ใน localStorage

            if (storedIsLoggedIn) {
                setIsLoggedIn(JSON.parse(storedIsLoggedIn)) // เป็นคำสั่งในการแปลงค่า สถานะการ Login ให้เป็น object
            }
},[]);


useEffect(()=>{

    const storedUser = localStorage.getItem('user'); // เป็นคำสั่งในการดึงค่า user ใน localStorage
   
            if(storedUser){
                setUser(JSON.parse(storedUser)); // เป็นคำสั่งในการแปลงค่า user ให้เป็น object
            }

},[]);

const updateUser = (newUser : User) =>{ // เป็นฟังก์ชั่นในการเก็บข้อมูลลูกค้าที่ทำการ Login
    setUser(newUser);
    localStorage.setItem('user',JSON.stringify(newUser)); // เป็นคำสั่งในการแปลงค่า user ให้เก็บอยู่ในรูปแบบ JSON และบันทึกลงใน localStorage
};

const handleLogin = (status : boolean) => { // เป็นฟังก์ชั่นในการเก็บ สถานะการ Login
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn',JSON.stringify(status)) // เป็นคำสั่งในการแปลงค่า isLoggedIn ให้เก็บอยู่ในรูปแบบ JSON และบันทึกลงใน localStorage
}




   return (
       <UserContext.Provider value ={{user,updateUser,handleLogin,isLoggedIn,setUserId,userId}}>{children}</UserContext.Provider>
   );
};

export default UserContext