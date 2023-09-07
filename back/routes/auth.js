const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer");
const bcrypt = require("bcrypt");

router.post("/email-confirmation", function (req, res, next) {
  res.send({ code: 123 });
});
router.post("/email-duplication", function (req, res, next) {
  res.send({});
});
router.post("/signup", function (req, res, next) {
  res.send({});
});

module.exports = router;
