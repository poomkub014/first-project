import React,{createContext,useEffect,useState} from "react";

 const UserContext = createContext(null);

export const UserProvider = ({children}) =>{
    const [user,setUser] = useState({
        firstName:'Guest',
        lastName:'',
        address:'',
        city:'',
        state:'',
        postalCode:'',
        phone:''        
    });
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [userId,setUserId] = useState(null)
   
useEffect(()=>{
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn')

            if (storedIsLoggedIn) {

                setIsLoggedIn(JSON.parse(storedIsLoggedIn))
            }

   

},[]);


useEffect(()=>{

    const storedUser = localStorage.getItem('user');
   
            if(storedUser){
                setUser(JSON.parse(storedUser));
            }

},[]);

const updateUser = (newUser) =>{
    setUser(newUser);
    localStorage.setItem('user',JSON.stringify(newUser));
};

const handleLogin = (status) =>{
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn',JSON.stringify(status))
}




   return (
       <UserContext.Provider value ={{user,updateUser,handleLogin,isLoggedIn,setUserId,userId}}>{children}</UserContext.Provider>
   );
};

export default UserContext