const express = require("express");
const Joi = require("joi");
const {
  getAllItems,
  getItemByAttribute,
  deleteItem,
  loginUser,
} = require("../DB-requests/DB-requests");
const { getItemByAttributeFromDB } = require("../DB-requests/DB-SQL-requests");
var router = express.Router();

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
  const { error } = loginSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send("Bad Schema");
  }
  res.send(await loginUser(req.body));
});

module.exports = router;
