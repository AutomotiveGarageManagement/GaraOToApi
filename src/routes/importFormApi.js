const express = require("express");
const router = express.Router();
const {
  createImport,
  getInfoFormImport,
  getInfoAllImport,
  deleteProduct,
  updateProduct,
} = require("../controllers/importController");
router.route("/create/form").post(createImport);
router.route("/get/information/form").post(getInfoFormImport);
router.route("/get/information/all").post(getInfoAllImport);
router.route("/update/product/:id").put(updateProduct);
router.route("/delete/product/:id").delete(deleteProduct);
module.exports = router;
