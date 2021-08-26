const express = require("express");
const router = express.Router();

const { searchController } = require("../controllers");

router.post("/", searchController.search.post);

module.exports = router;
