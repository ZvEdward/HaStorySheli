const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    displayName: {
        type: String,
        required: false,
    },
    profileImg: {
        type: String,
        required: false,
    },
    birthDate: {
        type: String,
        required: false,
    },
    about: {
        type: String,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    banner: {
        type: String,
        required: false,
    },
    myBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: false,
        },
    ],
    likedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: false,
        },
    ],
    continueBooks: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: false,
        },
        page: {
            type: Number,
            default: 0,
        }
    }]
}, { timestamps: true });

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
