const Users = require("../models/userModel");
const Books = require("../models/bookModel");

exports.createBook = async (req, res) => {
  try {
      console.log(req.body);
      const { title, pages, userId, summary,hashtags} = req.body;
      console.log(userId);
      const authorExists = await Users.findOne({_id:userId});
      console.log(authorExists);
  
      if (!authorExists) {
        return res.status(404).send({ message: 'Author not found' });
      }
      const newBook = new Books({
        title,
        pages,
        author: userId,
        summary,
        hashtags,
      });
  
      const savedBook = await newBook.save();
        await Users.findByIdAndUpdate(userId, {
        $push: { myBooks: savedBook._id },
      });
      res.status(201).send(savedBook);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

  exports.deleteBook = async (req, res) => {
    try {
        const { bookId, authorId } = req.body;

        const bookExists = await Books.exists({ _id: bookId });

        if (!bookExists) {
            return res.status(404).send({ error: 'Book not found' });
        }
        await Users.findByIdAndUpdate(authorId, {
            $pull: { myBooks: bookId },
        });
        await Books.findByIdAndDelete(bookId);

        res.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
exports.getTopLikedBooks = async (req, res) => {
  try {
    let limit = req.params.limit;
    if(limit >10)
    limit = 10;
    const topLikedBooks = await Books.find().sort({ likes: -1 }).limit(limit);

    res.status(200).send(topLikedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
