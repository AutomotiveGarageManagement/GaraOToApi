const express = require("express");
const router = express.Router();
const {
  getAllParameterInfo,
  updateParameterInfo,
} = require("../controllers/parameterController");
router.route("/get/parameters").get(getAllParameterInfo);
router.route("/update/parameters").put(updateParameterInfo);
module.exports = router;
