const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/signup").post(userController.createUser);
router.route("/signin").post(userController.Signin);


// router.route("/edit/:id").post(userController.editUserById)
// router.route("/DeleteByID/:id").delete(userController.deleteById);
// router.route('/authenticate/:id').get(userController.authenticate);
// router.route("/verify/:token").get(userController.verifyEmail);
router.route("/likebook").post(userController.toggleLikedBook)
router.route("/signout").get(userController.signout)
router.route("/getThisUser").get(userController.getThisUser)
module.exports = router;