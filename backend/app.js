const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRouterCreator = require("./routes/usersRoutes");
const bookRouterCreator = require("./routes/booksRoutes");
module.exports = app;
app.use(express.json());
app.use(cookieParser());
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
  };

  app.use(cors(corsOptions));
app.use("/users", userRouterCreator);
app.use("/books", bookRouterCreator);
