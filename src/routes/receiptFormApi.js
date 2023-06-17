const express = require("express");
const router = express.Router();
const {
  createReception,
  getCustomerInfo,
  updateInfoReception,
  getAllReceptions,
} = require("../controllers/receiptFormController");
router.route("/create/form").post(createReception);
router.route("/get/customerInfo").post(getCustomerInfo);
router.route("/update/information/form/:id").put(updateInfoReception);
router.route("/getAll").get(getAllReceptions);
module.exports = router;
