import { useEffect, useState } from "react";
import { LabelContext } from "./LabelContext";
import {
  createLabelCall,
  deleteLabelCall,
  getLabelCall,
  updateLabelCall,
} from "../../helper/labelCalls";
import useUser from "../User/UserContext";
// eslint-disable-next-line react/prop-types
const LabelContextProvider = ({ children }) => {
  const [labels, setLabels] = useState([]);
  const myuser = useUser();

  const getLabels = async () => {
    if (!myuser.user) {
      return {success:false,message:"User not Authentic", data:[]};
    }
    try {
      const response = await getLabelCall();
      if (!response.success) {
        return {success:false, message:response.message, data:[]};
      }

      return response;
    } catch (error) {
    
      return {success:false, message:error.message, data:[]};
    }
  };

  const updateLabel = async (labelId, updates) => {
    if (!myuser.user) {
      return {success:false};
    }

    try {
      const response = await updateLabelCall(labelId, updates);
      if (!response.success) {
      
        return {success:false, message: response.message}
      }
      const label = response.data;
      setLabels((prevLabels) => {
        return prevLabels.map((item) =>
          item._id === label._id ? label : item
        );
      });
      return response;
    } catch (error) {
   
      return {success:false, message:error.message};
    }
  };

  const deleteLabel = async (labelId) => {
    if (!myuser.user) {
      return {success:false, message: "User unauthentic"}
    }

    try {
      const response = await deleteLabelCall(labelId);
      if (!response.success) {

        return response;
      }
      setLabels((prevLabels) => {
        return prevLabels.filter((label) => label._id !== labelId);
      });
      return response
    } catch (error) {
  
      return {success:false, message: error.message}
    }
  };

  const createLabel = async (label) => {
    if (!myuser.user) {
      return {success:false, message: "User unauthentic"}
    }

    try {
      const response = await createLabelCall(label);
      if (!response.success) {
     
        return response
      }

      setLabels((prevLabels) => {
        return [...prevLabels, response.data];
      });
      return response;
    } catch (error) {

      return {success:false, message: error.message}
    }
  };

  useEffect(() => {
    try {
      getLabels()
        .then((respond) => {
          setLabels(respond.data);
        })
        .catch((e) => {
        return e
        });
    } catch (error) {
     error
      return;
    }
  }, [myuser.user]);

  return (
    <LabelContext.Provider
      value={{ labels, getLabels, updateLabel, deleteLabel, createLabel }}
    >
      {children}
    </LabelContext.Provider>
  );
};

export default LabelContextProvider;
