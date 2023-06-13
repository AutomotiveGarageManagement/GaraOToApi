const express = require("express");
const router = express.Router();
const {
  createANewWageType,
  updateWageInfo,
  removeWageType,
  getAllWageType,
  searchWageType,
} = require("../controllers/wageController");
router.route("/create/wage").post(createANewWageType);
router.route("/update/wage/:id").put(updateWageInfo);
router.route("/delete/wage/:id").delete(removeWageType);
router.route("/get/wages").get(getAllWageType);
router.route("/find/wage").post(searchWageType);

module.exports = router;
