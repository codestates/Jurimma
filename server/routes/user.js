const express = require('express');
const router = express.Router();

const { userController } = require("../controllers");

router.post("/login", userController.login.post);
router.post("/logout", userController.logout.post);
router.post("/signup", userController.signup.post);
router.delete("/signout", userController.signout.delete);
router.patch("/edit", userController.edit.patch);
router.patch("/userPicEdit", userController.userPicEdit.patch);

module.exports = router;