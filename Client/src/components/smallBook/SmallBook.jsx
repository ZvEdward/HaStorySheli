// SmallBook.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SmallBook.css";

function SmallBook({ Book }) {
  const { title, pages, author, createdAt, likes } = Book || {};
  const navigate = useNavigate();

  if (!Book) {
    return null;
  }

  const FrontImg = pages ? pages[0] : null;
  const BackImg = pages ? pages[pages.length - 1] : null;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  const handleBookClick = () => {
    console.log(Book)
    navigate("/ViewBook", { state:Book });
  };

  return (
    <div className="book-container" onClick={handleBookClick}>
      <p className="book-title">{title}</p>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={FrontImg} alt="Book Cover" />
          </div>

          <div className="flip-card-back">
            <div className="back-container">
              <img className="backimg" src={BackImg} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="book-details">
        <div className="book-metadata">
          <span className="book-likes">Likes: {likes}</span>
          <span className="book-date">Date: {formattedDate}</span>
        </div>
      </div>
    </div>
  );
}

export default SmallBook;
