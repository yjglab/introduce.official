const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const User = require("../models/user");

router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const userInfo = await User.findOne({
        where: { email: req.user.email },
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(200).json(userInfo);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
