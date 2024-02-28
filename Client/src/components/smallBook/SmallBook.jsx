// SmallBook.jsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SmallBook.css";
import Context from "../../Context";

function SmallBook({ Book }) {
  const { title, pages, author, createdAt, likes } = Book || {};
  const navigate = useNavigate();
  const { user, setToastData, toastData, postRequest } = useContext(Context);

  if (!Book) {
    return null;
  }

  const FrontImg = pages ? pages[0] : null;
  const BackImg = pages ? pages[pages.length - 1] : null;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  const handleBookClick = () => {
    navigate("/ViewBook", { state: Book });
  };
  const CheckIfILike = () => {
    if (!user || !user.likedBooks || !Array.isArray(user.likedBooks)) {
      return false;
    }
    return user.likedBooks.includes(Book._id);
  };
  const CheckLike = async () => {
    const response = await postRequest("/users/likebook", Book._id).then(
      (response) => {
        setToastData({
          type: response.data.type,
          content: response.data.message,
        });
      }
    );
  };
  useEffect(() => {
    console.log(toastData);
  }, [toastData]);

  return (
    <div className="book-container">
      <p className="book-title">{title}</p>
      <div className="flip-card" onClick={handleBookClick}>
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
          <span className="book-likes" onClick={CheckLike}>
            {CheckIfILike() ? `❤️` : `🖤`}:{likes}
          </span>
          <span className="book-date">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}

export default SmallBook;
