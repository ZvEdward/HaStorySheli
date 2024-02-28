const mongoose = require("mongoose"); // npm i mongoose.
const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password:
  {
    type: String,
    required: true,
  },
  email:
  {
    type: String,
    required: false,
  },
  verified:
  {
    type: Boolean,
    default:false,
  },
  myBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required:false,
    },
  ],
  likedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required:false,
    },
  ],
});
const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
