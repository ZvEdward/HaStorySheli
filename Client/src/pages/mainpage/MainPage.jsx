import { useState, useEffect, useContext } from "react";
import React from "react";
import logo from "../../images/Logo.png";
import axios from "axios";
import smallBook from "../../components/smallBook/SmallBook.jsx"
function MainPage() {
  const [myBooks, setMyBooks] = useState();
  
  function fetchMostLiked() {
    axios
      .get("mostliked")
      .then((response) => {
        setLikedArr(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  const getMostLike = async () => {
    try {
      const response = await getRequest(`/users/getMyBooks`);
      if (Array.isArray(response?.data)) {
        setMostLikedBooks(response?.data);
      } else {
        console.error("Invalid response format:", response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMostLike();
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
        <ul>
          {LikedArr.map((item, index) => (
            <div key={index}>
              <smallBook Book={LikedArr[index]} onClick={OpenBook(LikedArr[index])} />
            </div>
            
          ))}
        </ul>
        <hr />
      </div>
      <div>
        <p>ספרים חדשים</p>
        <ul>
          {NewArr.map((item, index) => (
            <div key={index}>
              <SmallBook Book={NewArr[index]} />
            </div>
            
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainPage;
