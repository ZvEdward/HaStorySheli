import React, { useContext, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
// import DynamicNavBar from './DynamicNavBar';
import { Bounce, Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from '../../Context.jsx';
// import Navbar from '../../components/navbar/Navbar';
function Layout() {
  const Data = useContext(Context);
useEffect(() => {
  if(Data?.toastData?.type =="success")
  {
  toast.success(Data?.toastData?.content, {
    position: "top-center",
    autoClose: 2400,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
    });
    Data.setToastData({})
  }
  if(Data?.toastData?.type =="info")
  {
  toast.info(Data?.toastData?.content, {
    position: "top-center",
    autoClose: 2400,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
    });
    Data.setToastData({})
  }
    if(Data?.toastData?.type == "error")
    {
      toast.error(Data?.toastData?.content, {
        position: "top-center",
        autoClose: 2400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        });
        Data.setToastData({})
    }
    
},[Data?.toastData]);

  
const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#2b6292',
    },
    secondary: {
      main: '#15ff00',
    },
    background: {
      default: '#d4d4d4',
      paper: '#ffffff',
    },
    error: {
      main: '#ff0e00',
    },
    warning: {
      main: '#edff00',
    },
    info: {
      main: '#f900ff',
    },
    success: {
      main: '#00ff09',
    },
    text: {
      primary: '#000000',
    },
  },
};

  const theme = createTheme(themeOptions);

  return (
    <div style={{ backgroundColor: theme.palette.background.default }}>

      <ThemeProvider theme={theme}>   
      <ToastContainer/>
        <CssBaseline style={{ color: 'white' }} />
        {/* <Navbar/> */}
        <Outlet />
        
      </ThemeProvider>
    </div>
  );
}

export default Layout;
