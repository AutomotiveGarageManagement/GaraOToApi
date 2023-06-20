const express = require("express");
const router = express.Router();
const {
  getSumCustomer,
  getSumTurnover,
  getSumReceipt,

  getRepairByMonth,
} = require("../controllers/statisticController");
router.route("/get/sum-customer").get(getSumCustomer);
router.route("/get/sum-turnover/:id").get(getSumTurnover);
router.route("/get/sum-receipt/:id").get(getSumReceipt);
router.route("/get/repair-month").get(getRepairByMonth);

module.exports = router;
