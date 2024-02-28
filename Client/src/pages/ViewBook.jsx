import React, { useState } from "react";
import "./ViewBook/ViewBook.css"
import pic1 from "../images/print book almog-1.jpg";
import pic2 from "../images/print book almog-2.jpg";
import pic3 from "../images/print book almog-3.jpg";
import pic4 from "../images/print book almog-4.jpg";
import pic5 from "../images/print book almog-5.jpg";
import pic6 from "../images/print book almog-6.jpg";
import pic7 from "../images/print book almog-7.jpg";
import pic8 from "../images/print book almog-8.jpg";
import pic9 from "../images/print book almog-9.jpg";

function ViewBook() {
  const [index, setIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(pic1);

  const Pictures = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9];
const author= "עומר בן עזרא"
  const handleNext = () => {
    let nextIndex = index + 1;
    if (nextIndex >= Pictures.length) {
      nextIndex = 0; 
    }
    setIndex(nextIndex);
    setImgSrc(Pictures[nextIndex]);
  };

  const handlePrevius = () => {
    let prevIndex = index - 1;
    if (prevIndex < 0) {
      prevIndex = Pictures.length - 1; 
    }
    setIndex(prevIndex);
    setImgSrc(Pictures[prevIndex]);
  };

  return (
    <>
    <div id="BookText">
    <p>כותב הספר: {author}</p>

    </div>
    <div className="PagesContainer">
            <button className="pagesBTN" id= "PreviousPage" onClick={handlePrevius}>{<p className="BTNtext">{"<"}</p>}</button>
            <img id="Page" src={imgSrc} alt="" />
            <button className="pagesBTN" id= "nextPage"onClick={handleNext}>{<p className="BTNtext">{">"}</p>}</button>
    </div>
    </>
  );
}

export default ViewBook;
