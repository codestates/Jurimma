const express = require('express');
const router = express.Router();

const { searchController } = require("../controllers");

router.get("/:wordName", searchController.search.get);

module.exports = router;