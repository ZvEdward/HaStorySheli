const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pages: {
    type: Array,
    required: false,
  },
  approved: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  likes:{
    type: Number,
    defualt: 0,
  }
},{ timestamps: true });

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;