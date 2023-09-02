const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

router.get("/", function (req, res, next) {
  res.send({
    email: "jam",
  });
});

module.exports = router;
