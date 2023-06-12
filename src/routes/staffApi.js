const express = require("express");
const router = express.Router();
const {
  createANewStaff,
  login,
  createReception,
  createRepair,
  insertStaff,
} = require("../controllers/staffController");
router.route("/create").post(insertStaff);
router.route("/login").post(login);
module.exports = router;
