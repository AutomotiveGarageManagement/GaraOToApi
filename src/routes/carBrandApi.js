const express = require("express");
const router = express.Router();
const {
  createANewCarBrand,
  updateCarInfo,
  removeCarBrand,
  getAllCarBrand,
  searchCarBrand,
} = require("../controllers/carBrandController");
router.route("/create/brand").post(createANewCarBrand);
router.route("/update/brand/:id").put(updateCarInfo);
router.route("/delete/brand/:id").delete(removeCarBrand);
router.route("/get/brands").get(getAllCarBrand);
router.route("/find/brand").post(searchCarBrand);

module.exports = router;
