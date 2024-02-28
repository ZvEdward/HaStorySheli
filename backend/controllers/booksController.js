const Users = require("../models/usersModel");
const Books = require("../models/booksModel");

exports.createBook = async (req, res) => {
    try {
      const { title, pages, approved, authorId } = req.body;
  
      const authorExists = await Users.exists({ _id: authorId });
  
      if (!authorExists) {
        return res.status(404).send({ error: 'Author not found' });
      }
  
      const newBook = new Books({
        title,
        pages,
        approved,
        author: authorId,
      });
  
      const savedBook = await newBook.save();
        await Users.findByIdAndUpdate(authorId, {
        $push: { createdBooks: savedBook._id },
      });
  
      res.status(201).send(savedBook);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  };