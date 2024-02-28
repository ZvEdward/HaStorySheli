// SmallBook.jsx

import React from "react";
import "./SmallBook.css"; // Import your CSS file for SmallBook styling

function SmallBook({ Book }) {
  const { title, pages, author, createdAt, likes } = Book || {};

  if (!Book) {
    return null;
  }

  const FrontImg = pages ? pages[0] : null;
  const BackImg = pages ? pages[pages.length - 1] : null;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="book-container">
      <p className="book-title">{title}</p>
      <div className="flip-card">
        <div className="flip-card-inner">
          {/* Front Side */}
          <div className="flip-card-front">
            <img src={FrontImg} alt="Book Cover" />
          </div>

          {/* Back Side (Image as Background) */}
          <div className="flip-card-back">
            <div className="back-container">
              <img className="backimg" src={BackImg} alt="" />
              <h1 className="text-before-cards">NBA 2K24</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Book Details */}
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
