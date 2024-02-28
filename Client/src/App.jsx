// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import ViewBook from "./pages/ViewBook";
import MainPage from "./pages/mainpage/MainPage";
import Homepage from "./pages/Homepage/Homepage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/ViewBook" element={<ViewBook />} />
          <Route path="/*" element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;