const express = require("express");
const bodyParser = require("body-parser");
const conn = require("./src/configs/configDataBase");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8888;

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8888");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// set up url to call api

app.use("/api/staff/", require("./src/routes/staffApi"));
// Form Receipt
app.use("/api/receipt/", require("./src/routes/receiptFormApi"));
// Form Repair
app.use("/api/repair/", require("./src/routes/repairFormApi"));
app.use("/api/payment/", require("./src/routes/paymentReceiptApi"));
app.use("/api/carBrand/", require("./src/routes/carBrandApi"));
app.use("/api/supplier/", require("./src/routes/supplierApi"));
app.use("/api/wage/", require("./src/routes/wageApi"));
//Form import
app.use("/api/import/", require("./src/routes/importFormApi"));

//Statistic
app.use("/api/")
// config body bodyParser
app.use(
  bodyParser.urlencoded({
    limit: "1000kb",
    parameterLimit: 1000000,
    extended: true,
  })
);

app.use;
app.listen(PORT, () => {
  console.log("App running on port: " + PORT);
});
