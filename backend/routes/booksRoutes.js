const express = require("express");
const booksController = require("../controllers/booksController");
const router = express.Router();

router.route("/createBook").post(booksController.createBook);
router.route("/deleteBook").delete(booksController.deleteBook);
module.exports = router;