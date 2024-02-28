import React from "react";

function SmallBook(Book) {

    const BookId= Book._id;
    const BookTitle= Book.title;
    const FrontImg= Book.pages[0];
    const BackImg= Book.pages[pages.length-1];
    const Author= Book.author;
    const createdAt= Book.createdAt;


  return (
    <>
     <p>{BookTitle}</p>
     <img src= {FrontImg} alt="missing img" />
     <div>
        <span>{Author}</span>
        <span>{createdAt}</span>

     </div>

    </>
  );
}

export default SmallBook;
