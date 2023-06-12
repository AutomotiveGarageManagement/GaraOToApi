const express = require("express");
const router = express.Router();
const {
  createRepair,
  getInfoFormRepair,
  deleteProduct,
  updateProduct,
} = require("../controllers/repairFormController");
router.route("/create/form").post(createRepair);
router.route("/get/information/form").post(getInfoFormRepair);
router.route("/update/product/:id").put(updateProduct);
router.route("/delete/product/:id").delete(deleteProduct);
module.exports = router;
