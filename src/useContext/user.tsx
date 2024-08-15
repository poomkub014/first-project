import React,{createContext,useEffect,useState} from "react";

 const UserContext = createContext(null);

export const UserProvider = ({children}) =>{
    const [user,setUser] = useState({username:'Guest'});
    const [isLoggedIn,setIsLoggedIn] = useState(false)
   
useEffect(()=>{
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn')

            if (storedIsLoggedIn) {

                setIsLoggedIn(JSON.parse(storedIsLoggedIn))
            }

    const storedUser = localStorage.getItem('user');
   
            if(storedUser){
                setUser(JSON.parse(storedUser));
            }
},[]);

const updateUser = (newUser) =>{
    setUser(newUser);
    localStorage.setItem('user',JSON.stringify(newUser));
};

const handleLogin = () =>{
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn',JSON.stringify(true))
}

const handleLogout = () =>{
   setIsLoggedIn(false)
   localStorage.setItem('isLoggedIn',JSON.stringify(false))
}


   return (
       <UserContext.Provider value ={{user,updateUser,handleLogout,handleLogin,isLoggedIn}}>{children}</UserContext.Provider>
   );
};

export default UserContext