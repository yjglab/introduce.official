const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer");
const bcrypt = require("bcrypt");

router.post("/email-duplication", async (req, res, next) => {
  const code = "123";
  const hashedCode = await bcrypt.hash(code, 10);
  // !todo: 이메일로 code 전송
  res.send(hashedCode);
});
router.post("/email-confirmation", async (req, res, next) => {
  try {
    const { emailConfirmationCode, assignedConfirmationCode } = req.body;
    console.log(emailConfirmationCode, assignedConfirmationCode);
    const codeMatched = await bcrypt.compare(
      emailConfirmationCode,
      assignedConfirmationCode
    );
    if (!codeMatched) {
      return res
        .status(403)
        .send("인증코드가 일치하지 않습니다. 다시 시도해주세요.");
    }
    res.status(200).send("인증되었습니다.");
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post("/signup", async (req, res, next) => {
  res.send({});
});

module.exports = router;
