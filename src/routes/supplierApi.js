const express = require("express");
const router = express.Router();
const {
  createANewSupplier,
  updateSupplierInfo,
  removeSupplier,
  getAllSupplierInfo,

  searchSupplier,
} = require("../controllers/supplierController");
router.route("/create/supplier").post(createANewSupplier);
router.route("/update/supplier/:id").post(updateSupplierInfo);
router.route("/delete/supplier/:id").delete(removeSupplier);
router.route("/get/suppliers").get(getAllSupplierInfo);
router.route("/find/supplier").post(searchSupplier);

module.exports = router;
