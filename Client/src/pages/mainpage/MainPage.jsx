import React, { useState, useEffect, useContext } from "react";
import logo from "../../images/Logo.png";
import Context from "../../Context.jsx";
import SmallBook from "../../components/smallBook/SmallBook.jsx";
import "./MainPage.css";
import Footer from "../../components/Footer/Footer.jsx";

function MainPage() {
  const [myBooks, setMyBooks] = useState([]);
  const [lastBooks, setLastBooks] = useState([]);
  const [mostLikedBooks, setMostLikedBooks] = useState([]);
  const { getRequest } = useContext(Context);

  const getMyBooks = async () => {
    try {
      const response = await getRequest("/users/getMyBooks");
      if (Array.isArray(response?.data.myBooks)) {
        setMyBooks(response?.data.myBooks);
      } else {
        console.error("Invalid response format:", response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getLastBooks = async () => {
    try {
      const response = await getRequest("/books/latestbooks/4");
      if (Array.isArray(response?.data)) {
        setLastBooks(response?.data);
      } else {
        console.error("Invalid response format:", response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getMostLike = async () => {
    try {
      const response = await getRequest(`/books/getMostLike/4`);
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
    getLastBooks();
    getMyBooks();
  }, []);

  return (
    <div className="section">


      {myBooks.length > 0 && (<><h1  className="title"> ספרים שלי</h1><div className="mostLiked">
          
          {myBooks.map((item, index) => (
            <div className="book" key={index}>
              <SmallBook Book={item} />
            </div>
          ))}
        </div>
        </>

      )}

      {lastBooks.length > 0 && (
        <>
          <h1 className="title">חדשים</h1>
          <div className="mostLiked">
            
            {lastBooks.map((item, index) => (
              <div className="book" key={index}>
                <SmallBook Book={item} />
              </div>
            ))}
          </div>
        </>
      )}
          {mostLikedBooks.length > 0 && (
        <>
          <h1 className="title">אהובים ביותר</h1>
          <div className="mostLiked">
            
            {mostLikedBooks.map((item, index) => (
              <div className="book" key={index}>
                <SmallBook Book={item} />
              </div>
            ))}
          </div>
        </>
      )}
      <Footer/>
    </div>
  );
}

export default MainPage;
