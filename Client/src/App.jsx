// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import ViewBook from "./pages/ViewBook/ViewBook";
import MainPage from "./pages/mainpage/MainPage";
import Homepage from "./pages/Homepage/Homepage";
import AddBook from "./pages/AddBook/AddBook";
function App() {
  return (
    <>
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/ViewBook" element={<ViewBook />} />
          <Route path="/*" element={<MainPage />} />
          <Route path="/addBook" element={<AddBook/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
