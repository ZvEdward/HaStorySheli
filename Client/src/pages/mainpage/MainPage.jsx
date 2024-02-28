import { useState, useEffect, useContext } from "react";
import React from "react";
import logo from "../../images/Logo.png";
import axios from "axios";
import SmallBook from "../../component/SmallBook";

function MainPage() {
  const [LikedArr, setLikedArr] = useState([]);
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

  return (
    <>
      <div>
        <img src={logo} alt="yyy" />
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
              <SmallBook Book={LikedArr[index]} />
            </div>
            
          ))}
        </ul>
        <hr />
      </div>
      <div>
        <p>ספרים חדשים</p>
        //List
      </div>
    </>
  );
}

export default MainPage;
