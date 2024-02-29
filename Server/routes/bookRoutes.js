const express = require("express");
const booksController = require("../controllers/bookController");
const router = express.Router();

router.route("/createBook").post(booksController.createBook);
router.route("/deleteBook").delete(booksController.deleteBook);
router.route('/latestbooks/:limit').get(booksController.getLatestBooks);
module.exports = router;