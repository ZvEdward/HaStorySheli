const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();

router.route("/signup").post(usersController.createUser);
router.route("/signin").post(usersController.Signin);
router.route("/edit/:id").post(usersController.editUserById)
router.route("/all").get(usersController.getAllUsers);
router.route("/GetByID/:id").get(usersController.getUserById);
router.route("/all").delete(usersController.deleteAllUsers)
router.route("/DeleteByID/:id").delete(usersController.deleteById);
router.route('/authenticate/:id').get(usersController.authenticate);
router.route("/verify/:token").get(usersController.verifyUser);
router.route("/likebook").post(usersController.toggleLikedBook)
module.exports = router;