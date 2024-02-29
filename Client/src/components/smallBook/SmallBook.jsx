import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SmallBook.css";
import Context from "../../Context";

function SmallBook({ Book }) {
  const { title, pages, author, createdAt, likes } = Book || {};
  const navigate = useNavigate();
  const { setToastData, postRequest } = useContext(Context);
  const [Ilike, setIlike] = useState(false);

  if (!Book) {
    return null;
  }

  const FrontImg = pages ? pages[0] : null;
  const BackImg = pages ? pages[pages.length - 1] : null;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  const handleBookClick = () => {
    navigate("/ViewBook", { state: Book });
  };

  const CheckIfILike = async () => {
    const response = await postRequest("/users/checkifIlike", { bookId: Book._id });
    setIlike(response.data.liked);
  };

  const CheckLike = async () => {
    try {
      const response = await postRequest("/users/likebook", { bookId: Book._id });
      setToastData({
        type: response.data.type,
        content: response.data.message,
      });

      if (response.data.type === "success") {
        setIlike(true);
        return true;
      } else if (response.data.message.includes("removed")) {
        setIlike(false);
        return false;
      }
    } catch (error) {
      if (!error.response.data.success) {
        setToastData({
          type: error.response.data.type,
          content: "המשתמש עדיין לא מחובר",
        });
      }
      console.error("Error while liking book:", error);
    }
  };

  useEffect(() => {
    CheckIfILike();
  }, [likes]);

  return (
    <div>
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
              {Ilike ? `❤️:${likes+1}` : `🖤:${likes}`}
            </span>
            <span className="book-date">{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallBook;
