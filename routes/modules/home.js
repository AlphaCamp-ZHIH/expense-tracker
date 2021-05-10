const express = require("express");
const Record = require("../../models/record");
const calculateTotalMount = require("../../helper/helper").calculateTotalMount;
const router = express.Router();

router.get("/", (req, res) => {
  Record.find()
    .lean()
    .then((expenses) => {
      const totalAmount = calculateTotalMount(expenses);
      res.render("index", { expenses, totalAmount });
    });
});

module.exports = router;
