const express = require("express");
const router = express.Router();
const {
  createReception,
  getInfoFormReceipt,
  updateInfoReception,
} = require("../controllers/receiptFormController");
router.route("/create/form").post(createReception);
router.route("/get/information/form").post(getInfoFormReceipt);
router.route("/update/information/form/:id").put(updateInfoReception);
module.exports = router;
