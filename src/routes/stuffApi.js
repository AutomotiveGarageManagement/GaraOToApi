const express = require("express");
const router = express.Router();
const {
  createANewStuff,
  updateStuffInfo,
  removeStuff,
  getAllStuffInfo,
  searchStuff,
} = require("../controllers/stuffController");
router.route("/create/stuff").post(createANewStuff);
router.route("/update/stuff/:id").post(updateStuffInfo);
router.route("/delete/stuff/:id").delete(removeStuff);
router.route("/get/stuffs").get(getAllStuffInfo);
router.route("/find/stuff").post(searchStuff);

module.exports = router;
