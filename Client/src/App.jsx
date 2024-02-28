import { useState, useRef, useContext } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Context from "./Context";
import Layout from "./pages/layout/Layout";
import ViewBook from "./pages/ViewBook";
import MainPage from "./pages/mainpage/MainPage";
import Homepage from "./pages/Homepage/Homepage";
function App() {
  const { user, setUser,authenticate } = useContext(Context);
 
  return (
    <>
 
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Homepage/>}></Route>
            <Route path="/*" element={<MainPage/>}></Route>
            </Route>
        </Routes>
      </BrowserRouter>
      <ViewBook/>
    </>
  );
}

export default App;
