const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const routerCreator = require("./routes/usersRoutes");
module.exports = app;
app.use(express.json());
app.use(cookieParser());
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
  };

  app.use(cors(corsOptions));
app.use("/users", routerCreator);
