const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");
const nodeMailer = require("nodemailer");
const { isNotSignIn, isSignIn } = require("./middlewares");

router.post("/signin", isNotSignIn, async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const userInfo = await User.findOne({
        where: { email: user.email },
        attributes: {
          exclude: ["password"],
        },
      });
      console.log(userInfo);
      return res.status(200).json(userInfo);
    });
  })(req, res, next);
});

router.post("/signup", isNotSignIn, async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 13);
    await User.create({
      email: req.body.email,
      name: req.body.username,
      password: hashedPassword,
      position: req.body.position,
    });

    res
      .status(201)
      .send("회원가입이 완료되었습니다! 가입된 정보로 로그인 해주세요.");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/signout", isSignIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("로그아웃 되었습니다.");
});

router.post("/email-duplication", isNotSignIn, async (req, res, next) => {
  try {
    const existedEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (existedEmail) {
      return res.status(403).send("이미 사용중인 이메일입니다.");
    }

    const code = "123";
    const hashedCode = await bcrypt.hash(code, 10);
    // !todo: 이메일로 code 전송
    res.json({
      message: `${req.body.email}로 인증코드를 전송했습니다. 확인 후 입력해주세요.`,
      hashedCode,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/email-confirmation", isNotSignIn, async (req, res, next) => {
  try {
    const { emailConfirmationCode, assignedConfirmationCode } = req.body;
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

module.exports = router;
