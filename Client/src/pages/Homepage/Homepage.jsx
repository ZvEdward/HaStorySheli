// Homepage.jsx
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import woman from "../../images/womanholdingphone.jpg";
import { Typography } from "@mui/material";
import Context from "../../Context";
import SmallBook from "../../components/smallBook/SmallBook";
import Footer from "../../components/Footer/Footer";
import manwriting from "../../images/manwriting.jpg";

function Homepage() {
  const { getRequest } = useContext(Context);
  const [mostLikedBooks, setMostLikedBooks] = useState([]);
  const [mostLikeView, setMostLikeView] = useState(4);
  const navigate = useNavigate();

  const getMostLike = async () => {
    try {
      const response = await getRequest(`/books/getMostLike/${mostLikeView}`);
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
            >הסיפור שלך כשהראה למישהו אחר, הצטרפו אלינו לקהילה של יוצרים וקוראים אשר תומכים ומחזקים אחד את השני, העלו ושתפו את סיפורכם, תנו לקהילה שלנו להיות הנקודת תמיכה שלכם ואפילו תהוו גורם משמעותי להתמודדות של מישהו אחר.
            </Typography>
          </div>

          <img className="firsthomepageimg" src={manwriting} alt="" />
        </div>
      </div>
      <div className="secondhomepage">
          <div className="firsthomepagetext">
            <Typography
              style={{
                color: "black",
                mr: "1px",
              }}
              dir="rtl"
              variant="h2"
            >
              <b>הסטורי שלהם</b>
            </Typography>
            <Typography
              style={{
                color: "black",
                mr: "1px",
              }}
              dir="rtl"
              variant="h6"
            >
              
דרך קריאה אנו נכנסים לעולם של הסופר, חווים את חייו דרך עיניו, נכנסים לעולמו מחשבותיו ותפיסת העולם היחודית שלהם! תשאבו לעלם שלם של סיפורים משמעותיים ומרגשים והפכו לחלק מהקהילה שלנו!
            </Typography>
          </div>

          <img className="secondhomepageimg" src={woman} alt="" />
      </div>
      <Typography
          style={{
            width:"100vw",
            textAlign: "center",
            backgroundColor:"#2b629262"
          }}
          dir="rtl"
          variant="h3"
        >
          <b>אהובים ביותר</b>
        </Typography>
      <div className="mostLikeda">
       
        {mostLikedBooks.map((item, index) => (
          <div key={index} style={{ width: "20%" }}>
            <SmallBook Book={item} />
          </div>
        ))}
      </div>
      <Footer/>
    </>
  );
}

export default Homepage;
