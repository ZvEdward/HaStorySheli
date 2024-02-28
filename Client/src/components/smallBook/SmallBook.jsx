import React from "react";

function SmallBook(Book) {

    const BookId= Book._id;
    const BookTitle= Book.title;
    const FrontImg= Book.pages[0];
    const BackImg= Book.pages[pages.length-1];
    const Author= Book.author;
    const Date= Book.Date;


  return (
    <>
    <p>כותה הספר: </p>
     <p>{BookTitle}</p>
     <img src= {FrontImg} alt="missing img"style={{ width: '150px', height: 'auto' }} />
     <div>
        <span>{Author}</span>
        <span>{Date}</span>

     </div>

    </>
  );
}

export default SmallBook;
