import { useEffect, useState } from "react";
import { NoteContext } from "./NoteContext";
import {
  createNoteCall,
  deleteNoteCall,
  getNoteCall,
  updateNoteCall,
} from "../../helper/noteCalls";
import useUser from "../User/UserContext";

// eslint-disable-next-line react/prop-types
const NoteContextProvider = ({ children }) => {
  const [notes, setNotes] = useState(null);
  const myuser = useUser();

  const getNotes = async () => {
    if (!myuser.user) {
      return {success:false, message:"User unauthentic", data:[]};
    }
    try {
      const response = await getNoteCall();
      if (!response.success) {
    
        return {success:false, message:response.message, data:[]};
        
      }

      return response;
    } catch (error) {
   
      return {success: false, message:error.message, data: []}
    }
  };
  const updateNotes = async (noteId, updates) => {
    try {
      const response = await updateNoteCall(noteId, updates);
      if (!response.success) {
     
        return response;
      }
      const note = response.data;
      setNotes((prevNotes) => {
        return prevNotes.map((item) => (item._id === note._id ? note : item));
      });
      return response
    } catch (error) {

      return {success: false, message:error.message}
    }
  };

  const deleteNotes = async (noteId) => {
    try {
      const response = await deleteNoteCall(noteId);
      if (!response.success) {

        return response;
      }
      setNotes((prevNotes) => {
        return prevNotes.filter((note) => note._id !== noteId);
      });
      return response;
    } catch (error) {

      return {success: false, message:error.message}
    }
  };

  const createNotes = async (note) => {
    try {
      const response = await createNoteCall(note);
      if (!response.success) {
     
        return response;
      }
   
      
      setNotes((prevNotes) => {
        return [...prevNotes, response.data]
      });
          return {success:true,message:response.message ,data: response.data};
    } catch (error) {

      return {success: false, message:error.message}
    }
  };

  useEffect(() => {
    try {
      getNotes()
        .then((respond) => {
          setNotes(respond.data);
        })
        .catch((e) => {
     return e
        });
    } catch (error) {
   
      return error;
    }
  }, [myuser.user]);

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, updateNotes, deleteNotes, createNotes }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
