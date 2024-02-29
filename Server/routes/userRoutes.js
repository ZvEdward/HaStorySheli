const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/signup").post(userController.createUser);
router.route("/signin").post(userController.Signin);
router.route("/likebook").post(userController.toggleLikedBook);
router.route("/signout").get(userController.signout);
router.route("/getThisUser").get(userController.getThisUser);
router.route("/getmybooks").get(userController.getMyBooks);
router.route("/checkifIlike").post(userController.checkifIlike);
router.route("/updateThisUser").post(userController.updateThisUser);

module.exports = router;