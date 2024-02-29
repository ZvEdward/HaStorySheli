// Context.jsx
import axios from "axios";
import { createContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const getRequest = async (request) => {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_CALL}${request}`,
      {
        withCredentials: true,
      }
    );
    if (response?.status <= 400 && response?.data?.message) {
      setToastData({ type: "error", message: response.data.message });
    }

    return response;
  };

  const postRequest = async (request, data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_CALL}${request}`,
      data,
      {
        withCredentials: true,
      }
    ); 

    if (response?.status <= 400 && response?.data?.message) {
      setToastData({ type: "error", message: response.data.message });
    }

    return response;
  }

  const [toastData, setToastData] = useState({}); 

  const [user, setUser] = useState({ Username: '', Password: '', Email: '' });
  
  return (
    <Context.Provider value={{ user, setUser, postRequest, getRequest, toastData, setToastData, imagearray,setimagearray}}>
      {children}
    </Context.Provider>
  );
};

export default Context;
