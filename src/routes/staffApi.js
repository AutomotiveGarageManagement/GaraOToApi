const express = require("express");
const router = express.Router();
const {
  login,
  insertStaff,
  updateStaffInfo,
  removeStaff,
  searchStaff,
  getAllStaff,
  getStaffById,
} = require("../controllers/staffController");
router.route("/create").post(insertStaff);
router.route("/update/:id").put(updateStaffInfo);
router.route("/delete/:id").delete(removeStaff);
router.route("/getAll").get(getAllStaff);
router.route("/getByID/:id").get(getStaffById);
router.route("/find").post(searchStaff);
router.route("/login").post(login);
module.exports = router;
