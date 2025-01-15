import { useState, useEffect } from "react";
import { UserContext } from "./UserContext.js";
import { getUserCall, logoutCall, registerCall, signinCall } from "../../helper/userCalls.js";


// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  

  const checkUser = async () => {
    try {
      const response = await getUserCall();
      if (!response.success) {
        setUser(null);
        return response;
      }
      setUser(response.data);
      return response
    } catch (error) {
 
      return {success:false, message:error.message};
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  const signin = async (email, password) => {
    try {
      const response = await signinCall(email, password);
      if (!response.success) {
    
        return {success:false, message:response.message};
      }
      setUser(response.data.user);
      return response;
    
    } catch (error) {

      return {success:false, message:error.message};
    }
  };

  const signup = async(email, password, username)=>{
    try {
      const response = await registerCall(email,password,username);
      if(!response.success) {

        return response;        
      }
      return response;
    } catch (error) {
   
      return {success:false, message:error.message};
    }
  }

  const signout = async () => {
    try {
      const response = await logoutCall();
      if (!response.success) {
  
        return response;
      }
      setUser(null);
      return response;
    } catch (error) {
  
      return {success:false, message:error.message};
    }
  };

  return (
    <UserContext.Provider value={{ user, signin, signout, signup }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
