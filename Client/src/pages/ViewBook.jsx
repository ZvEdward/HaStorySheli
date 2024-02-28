import React, { useState } from "react";
import "./ViewBook/ViewBook.css"
import { useLocation } from "react-router-dom";

function ViewBook() {
  const Book = useLocation().state;
  console.log(Book)
  const [index, setIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(Book.pages[0]);

  const Pictures = Book.pages;
const author= Book.author;
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
            <button className="pagesBTN" id= "PreviousPage" onClick={handlePrevius}>{"<"}</button>
            <img id="Page" src={imgSrc} alt="" style={{ width: '100%', height: 'auto' }}/>
            <button className="pagesBTN" id= "nextPage"onClick={handleNext}>{">"}</button>
    </div>
    </>
  );
}

export default ViewBook;
