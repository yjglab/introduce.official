const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const db = require("./models");
const passportConfig = require("./passport");
const passport = require("passport");

const userRouter = require("./routes/user");
const { SERVER_PORT, PRODUCTION } = require("./constants");

dotenv.config();
passportConfig();
db.sequelize
  .sync()
  .then(() => {
    console.log("✅ DB Connected");
  })
  .catch(console.error);

const app = express();
const allowedOrigins = [""];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("🚫 Not allowed by CORS"));
    }
  },
};
if (PRODUCTION) {
  app.enable("trust proxy"); // https
  app.use(morgan("combined"));
  app.use(hpp()); // 보안용
  app.use(helmet()); // 보안용
  app.use(cors(corsOptions));
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

app.use("/", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    proxy: PRODUCTION, // https
    cookie: {
      httpOnly: true,
      secure: PRODUCTION,
      domain: PRODUCTION && ".hulter.com",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);

app.listen(SERVER_PORT, () => {
  console.log("🌐 Server Connected");
});
