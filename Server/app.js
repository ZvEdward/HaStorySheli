const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userController = require('./controllers/userController')
const bookController = require('./controllers/bookController')
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin:`${process.env.CLIENT_URL}`,
    credentials: true,
};
app.use(cors(corsOptions));
app.get("/books/getMostLike/:limit",bookController.getTopLikedBooks);
app.post("/users/signin", userController.Signin);
app.post("/users/signup", userController.createUser);
app.get("/users/verify/:token", userController.verifyEmail);

app.use(userController.verifyToken);
app.use("/users", userRoutes);
app.use("/books", bookRoutes);


module.exports = app;