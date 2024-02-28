import { useState, useRef, useContext } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Context from "./Context";
import Layout from "./pages/layout/Layout";
import ViewBook from "./pages/ViewBook";
import MainPage from "./pages/mainpage/MainPage";
function App() {
  const { user, setUser,authenticate } = useContext(Context);
 
  return (
    <>
 
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route path="/PDFForms" element={<EditPDF/>}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/PDFForms" element={<EditPDF/>}></Route>
            <Route path="/signin" element={<SignIn/>}></Route>
            <Route path="/mainpage" element={<MainPage/>}></Route> */}
            <Route path="/*" element={<MainPage/>}></Route>
            </Route>
        </Routes>
      </BrowserRouter>
      <ViewBook/>
    </>
  );
}

export default App;
