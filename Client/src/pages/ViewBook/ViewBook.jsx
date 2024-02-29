import React, { useContext, useState } from "react";
import "./ViewBook.css";
import Arrow from "../../images/Arrow.png";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import Context from "../../Context";
import zIndex from "@mui/material/styles/zIndex";
import SmallBook from "../../components/smallBook/SmallBook";
function ViewBook() {
  const{setIsModalOpen, IsModalOpen}= useContext(Context);
  const Book = useLocation().state;
  console.log(Book);
  const smallImg= Book.pages[0];
  const [index, setIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(Book.pages[0]);
  const Pictures = Book.pages;
  const author = Book.author;
  const handleNext = () => {
    let nextIndex = index + 1;
    if (nextIndex >= Pictures.length) {
      nextIndex = 0;
    }
    setIndex(nextIndex);
    setImgSrc(Pictures[nextIndex]);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      zIndex: "9999",
      width: "100vw",
      position: "fixed",
    },
  };
  const [portrait, setPortrait] = useState();
  let portraitdiv = window.matchMedia("(orientation: portrait)");

  portraitdiv.addEventListener("change", function (e) {
    console.log(e.matches);
    if (e.matches) {
      setPortrait("portrait");
      // Portrait mode
    } else {
      setPortrait("landscape");
      // Landscape
    }
  });
  const formattedDate = new Date(Book.createdAt).toLocaleDateString();
  console.log(document.body.offsetWidth);
  return (
    <><div style={{width:'100vw', display:'flex',justifyContent:'space-around', flexDirection:'row-reverse', alignItems:'center'}} id="BigContainer">
      <div className="textdiv">
<div  id="TXTContainer" dir="rtl">
      <p>שם הספר: {Book.title}</p>
      <p>תאריך העלאה: {formattedDate}</p>
      <p>תקציר:</p>
      <div>{Book.summary}</div>
      </div>
      </div>
      <div className="imagediv">
<img id="SmallIMG" src={smallImg} alt="null" onClick={openModal} />

</div>
   

      <div id="BookText">
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
            <div className="Rotate">
              <img id="Arrow" src={Arrow} alt="" />
              <span> Please rotate your screen</span>
            </div>
          )}

          <button className="closeModalBTN" onClick={closeModal}>
            חזור
          </button>
        </Modal>
      </div>
      </div>
      <p>
      </p>
    </>
  );
}

export default ViewBook;
