const express = require("express");
const router = express.Router();
const {
  createPaymentReceipt,
  getInfoPaymentReceipt,
  updateMoneyReceipt,
} = require("../controllers/paymentReceiptController");
router.route("/create/form").post(createPaymentReceipt);
router.route("/get/information/form").post(getInfoPaymentReceipt);
router.route("/update/information/form/:id").put(updateMoneyReceipt);
module.exports = router;
