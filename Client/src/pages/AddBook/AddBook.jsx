// Homepage.jsx
import React, { useContext, useState, useEffect } from "react";
import Context from "../../Context";
import axios from "axios";
import Cloudinary from "../../components/Cloudinary";
import "./AddBook.css";
function AddBook() {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState([]);
  const [newPage, setNewPage] = useState("");
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState();
  const [summary, setSummary] = useState("");
  const [newhashtag, setNewHashtag] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [newBook, setNewBook] = useState({});

  const { getRequest, postRequest, imagearray, setimagearray } =
    useContext(Context);

  useEffect(() => {
    getThisUser();
    console.log(imagearray);
  }, [imagearray]);

  const getThisUser = async () => {
    try {
      const response = await getRequest("/users/getThisUser");
      console.log(response.data.user);
      setUser(response.data.user);
      setUserId(user._id);
    } catch (error) {
      console.log(error);
    }
  };
  const AddNewPage = () => {
    setPages([...pages, newPage]);
    setNewPage("");
  };

  const AddHashtag = () => {
    setHashtags([...hashtags, newhashtag]);
    setNewHashtag("");
  };

  const handelSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/books/createBook",
        {
          title,
          pages: imagearray,
          userId: user._id,
          summary,
          hashtags,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return (
    <>
      <div 
      style={{ bottom: "0" }}
      >
        <h2>:אזור הוספת הספרים</h2>

        <div>
          <label>:כותרת הספר</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>:תקציר</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          ></textarea>
        </div>

        <div>
<p>:העלה תמונות על ידי לחיצה על הכפתור למטה</p>
          <Cloudinary value={{ imagearray, setimagearray }} />

          <p>:תמונות שהתווספו </p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {imagearray.map((item, index) => (
              <li
                key={index}
                style={{
                  display: "inline-block",
                  margin: "5px",
                  padding: "5px",
                }}
              >
                 <img src={imagearray[index]} alt="" 
                  style={{
                  display: "inline-block",
                  
                }}/>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label>:תן האשטג לספרים, בכל פעם אחד</label>
          <input
            type="text"
            value={newhashtag}
            onChange={(e) => setNewHashtag(e.target.value)}
          />
          <button onClick={AddHashtag}>! לחץ עלי כדי להכניס את ה-האשטאג</button>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {hashtags.map((item, index) => (
              <li
                key={index}
                style={{
                  display: "inline-block",
                  margin: "5px",
                  padding: "5px",
                }}
              >
          #{item},
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handelSubmit} type="submit">
          Add Book
        </button>
      </div>
    </>
  );
}

export default AddBook;
