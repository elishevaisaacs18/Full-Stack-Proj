var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var homeRouter = require("./routes/home");
var userRouter = require("./routes/user");
var postRouter = require("./routes/post");
var todoRouter = require("./routes/todo");
var commentRouter = require("./routes/comment");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRouter);
// app.use("/user", userRouter);
app.use("/post", postRouter);
// app.use("/comment", commentRouter);
// app.use("/todo", todoRouter);

module.exports = app;
