import axios from "axios";
import { createContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const getRequest = async (request) => {
    console.log(`${import.meta.env.VITE_REACT_APP_CALL}${request}`)
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_CALL}${request}`, {
      withCredentials: true, 
    });
    return response;
  }
  const postRequest = async (request,data) => {
    const response = await axios.post(`
      ${import.meta.env.VITE_REACT_APP_CALL}${request}`,data,
      {
        withCredentials: true,
      }
    );
    return response;
  }

  const [user, setUser] = useState({ Username: '', Password: '', Email: '' });
  return (
    <Context.Provider value={{ user, setUser,postRequest,getRequest}}>
      {children}
    </Context.Provider>
  );
};

export default Context;
