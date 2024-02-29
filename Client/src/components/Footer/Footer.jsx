import React from "react";
import "./Footer.css";

// Footer images
import facebook from "../../images/facebook-footer-white.png";
import twitter from "../../images/twitter-footer-white.png";
import linkedin from "../../images/linkedin-footer-white.png";
import youtube from "../../images/youtube-footer-white.png";
import appLogo from "../../images/Logo-Icon.png";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-top">
        <div className="footer-top-left">
          <a href="#">
            <div className="title">
              <img src={appLogo} style={{ width: "50px", height: "50px" }} />
              <h2>הסטורי שלי</h2>
            </div>
          </a>
          <p style={{display:'flex',justifyContent:'center',width:'80%', direction:'rtl'}}>כשאתה משתף את הסיפור שלך, אתה לא רק מספר סיפור. אתה יוצר חיבור, משמש כהשראה ומקנה לאחרים כוח להתמודד עם החיים. בוא להיות חלק מקהילה שיש בה הבנה, תמיכה, והשראה. הצטרף והשתף את הסיפור שלך, וביחד נבנה קהילה שמחזקת ומעניקה משמעות לכל סיפור ייחודי.</p>
        </div>
        <div className="footer-top-right">
          <div className="top-right-policies">
            <h2>מדיניות</h2>
            <p>מדיניות פרטיות</p>
            <p>GDPR מדיניות </p>
            <p>מדיניות קובצי עוגיות</p>
          </div>
          <div className="top-right-random">
            <p>קריירה</p>
            <p>בלוג</p>
            <p>תמיכה</p>
            <p>צוותנו</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <p>© 2024 HaStorySheli | כל הזכויות שמורות</p>
        <div className="footer-bottom-images">
          <img src={facebook} style={{ width: "28px", height: "28px" }} />
          <img src={twitter} style={{ width: "28px", height: "28px" }} />
          <img src={linkedin} style={{ width: "28px", height: "28px" }} />
          <img src={youtube} style={{ width: "27px", height: "27px" }} />
        </div>
      </div>
    </div>
  );
}