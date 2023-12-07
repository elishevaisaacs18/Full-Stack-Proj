var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var userRouter = require("./routes/user");
var postRouter = require("./routes/post");
var todoRouter = require("./routes/todo");
var commentRouter = require("./routes/comment");
const { loginTable, securityKey } = require("./userAccess");

var app = express();

app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

app.use((req, res, next) => {
  // console.log("headers are ", req.headers);
  if (req.path === "/user/login") {
    next();
    return;
  }
  // else if (req.headers.authorization == userHistory[0]?.access_token) {
  const userHistory = loginTable.filter((uh) => {
    return uh.id == req.body.user_id;
  });
  console.log("userHistory", userHistory);
  console.log("key", req.headers.authorization);
  console.log(
    "worth? ",
    req.headers.authorization == userHistory[0]?.access_token
  );

  next();
  // } else {
  //   //error
  // }
});

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/todo", todoRouter);

module.exports = app;
