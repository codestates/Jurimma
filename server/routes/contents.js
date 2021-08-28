const express = require('express');
const router = express.Router();

const { contentsController } = require("../controllers");

router.post("/", contentsController.contents.post);
router.post("/delete", contentsController.delete.post);
router.patch("/", contentsController.contents.patch);
router.patch("/thumbsup", contentsController.thumbsup.patch);

module.exports = router;