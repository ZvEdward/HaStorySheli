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
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [portrait, setPortrait] = useState();
  let portraitdiv = window.matchMedia("(orientation: portrait)");

  portraitdiv.addEventListener("change", function (e) {
    if (e.matches) {
      setPortrait("portrait");
      // Portrait mode
    } else {
      setPortrait("landscape");
      // Landscape
    }
  });
  console.log(document.body.offsetWidth);
  return (
    <>
      <p>
        <button onClick={openModal}>Open Modal</button>
      </p>

      <div id="BookText">
        <p>כותב הספר: {author}</p>

        <Modal
          id="Modal"
          isOpen={IsModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          {portrait === "landscape" ? (
            <div className="PagesContainer">
              <button
                className="pagesBTN"
                id="PreviousPage"
                onClick={handlePrevius}
              >
                {<p className="BTNtext">{"<"}</p>}
              </button>
              <img id="Page" src={imgSrc} alt="" />
              <button className="pagesBTN" id="nextPage" onClick={handleNext}>
                {<p className="BTNtext">{">"}</p>}
              </button>
            </div>
          ) : (
            <div>Please rotate your screen</div>
          )}
          {/* <button className="closeModalBTN" onClick={closeModal}>close</button> */}
        </Modal>
      </div>
    </>
  );
}

export default ViewBook;
