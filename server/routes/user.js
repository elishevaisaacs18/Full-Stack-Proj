const express = require("express");
const Joi = require("joi");
const {
  getAllItems,
  getItemByAttribute,
  deleteItem,
  loginUser,
} = require("../DB-requests/DB-requests");
var router = express.Router();
const { loginTable } = require("../userAccess");

// let loginTable = [{ user_name: "hani", access_token: 0, wrongPassword: [] }];

const schema = Joi.object({
  user_name: Joi.required(),
  full_name: Joi.required(),
});

const loginSchema = Joi.object({
  user_name: Joi.required(),
  password: Joi.required(),
});

router.get("/", async function (req, res) {
  res.send(await getAllItems("user"));
});

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  res.send(await getItemByAttribute("user", id, "id"));
});

router.post("/", async function (req, res) {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send("Bad Schema");
  }
  res.send(await postItem("user", req.body));
});

router.delete("/:id", async function (req, res) {
  const id = req.params.id;
  res.send(await deleteItem("user", id));
});

router.post("/login", async function (req, res) {
  let access_token = 0;
  const { error } = loginSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send("Bad Schema");
  }
  console.log("loginTable: ", loginTable);
  const userHistory = loginTable.filter((uh) => {
    return uh.user_name === req.body.user_name;
  });
  console.log("userHistory: ", userHistory);
  if (userHistory[0]?.wrongPassword?.length >= 3) {
    res.send(
      "There have been 3 incorrect login attempts in the last 10 seconds. Please wait 10 seconds"
    );
    return;
  }
  const user = await loginUser(req.body);
  // loginTable.push(5);
  // console.log(loginTable);
  if (user[0].user_name) {
    // console.log("god");
    if (!userHistory[0]) {
      loginTable.push({
        user_name: user[0].user_name,
        // access_token: Math.random(),
      });
    }
    loginTable.forEach((uh) => {
      if (uh.user_name === user[0].user_name) {
        access_token = Math.random();
        uh.access_token = access_token;
      }
      return uh;
    });
    setTimeout(() => {
      loginTable.forEach((uh) => {
        if (uh.user_name === user[0].user_name) {
          uh.access_token = 0;
        }
        return uh;
      });
    }, 30000);
  } else {
    if (!userHistory[0]) {
      loginTable.push({
        user_name: req.body.user_name,
        wrongPassword: [],
      });
    }
    // console.log(8888);
    loginTable.forEach((uh) => {
      if (uh.user_name === req.body.user_name) {
        uh.wrongPassword.push(1);
      }
      return uh;
    });
    setTimeout(() => {
      loginTable.forEach((uh) => {
        if (uh.user_name === req.body.user_name) {
          uh.wrongPassword?.pop();
        }
        return uh;
      });
    }, 10000);
  }

  console.log(loginTable);

  res.send(user);
  // res.send({ user: user, access_token: access_token });

  // console.log("hii");
});

module.exports = router;
