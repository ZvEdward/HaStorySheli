import "./Homepage.css";
import woman from "../../images/womanholdingphone.jpg";
import { Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import Context from "../../Context";

function Homepage() {
  const { getRequest } = useContext(Context);
  const [mostLikedBooks, setMostLikedBooks] = useState();

  const getMostLike = async () => {
    try {
      const response = await getRequest("/books/getMostLike/2");
      setMostLikedBooks(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMostLike();
  }, []);

  return (
    <>
      <div className="homepagediv">
        <div className="firsthomepage">
          <div className="firsthomepagetext">
            <Typography
              style={{
                color: "black",
                mr: "1px",
              }}
              dir="rtl"
              variant="h2"
            >
              <b>הסטורי שלי</b>
            </Typography>
            <Typography
              style={{
                color: "black",
                mr: "1px",
              }}
              dir="rtl"
              variant="h6"
            >
              ללמוד מאחרים הוא לראות את העולם מנקודת מבט שונה, להעשיר את הידע
              ולהתרחיש תרבות שונה. דרך הקריאה אנו נכנסים לעולמם של סופרים,
              מחשבותיהם ותפיסת העולם הייחודית שלהם, ובכך מרחיבים את חשיבתנו
              ומפתחים רגישות אמפתיה חדשה
            </Typography>
          </div>

          <img className="firsthomepageimg" src={woman} alt="" />
        </div>
      </div>
    </>
  );
}

export default Homepage;
