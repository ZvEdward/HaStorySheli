import { useState, useEffect, useContext } from "react";
import React from "react";
import logo from "../../images/Logo.png";
import Context from "../../Context.jsx";
import SmallBook from "../../components/smallBook/SmallBook.jsx";
function MainPage() {
  const [myBooks, setMyBooks] = useState();
  const {getRequest} =useContext(Context);
  const getMyBooks = async () => {
    try {
      const response = await getRequest(`/users/getMyBooks`);
      if (Array.isArray(response?.myBooks)) {
        setMyBooks(response?.myBooks);
      } else {
        console.error("Invalid response format:", response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMyBooks();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div >
        <img src={logo} alt="yyy" style={{ width: "200px" }} />
      </div>
      
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio voluptates
        deserunt porro expedita assumenda delectus aut provident, sequi aliquam
        iure, incidunt sit tenetur quidem officia error possimus illo illum et.
      </p>

      <div>
        <p>הכי אהובים</p>
        
        <hr />
      </div>
      <div>
        <p>ספרים חדשים</p>
        
      </div>
    </div>
  );
}

export default MainPage;
