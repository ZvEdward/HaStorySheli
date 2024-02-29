const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pages: {
    type: Array,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  likes:{
    type: Number,
    default: 0,
  },
  summary:
  {
    type:String,
    required: false,
  },
  hashtags:[
  {
    type:Array,
    required: false,
  }]
},{ timestamps: true });

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;