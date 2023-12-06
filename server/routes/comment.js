const express = require("express");
const Joi = require("joi");
const executeQuery = require("../../DB/dbUtils").executeQuery;
const {
  getAllItems,
  deleteItem,
  postItem,
  updateItem,
} = require("../DB-requests/DB-requests");

var router = express.Router();

const schema = Joi.object({
  post_id: Joi.required(),
  user_id: Joi.required(),
  body: Joi.required(),
  title: Joi.required(),
});

router.put("/:id", async function (req, res) {
  console.log("res.body: ", req.body);
  res.send(await updateItem("comment", req.body));
});

router.get("/", async function (req, res) {
  res.send(await getAllItems("comment"));
});

router.post("/", async function (req, res) {
  console.log("req.bod: ", req.body);
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send("Bad Schema");
  }
  res.send(await postItem("comment", req.body));
});

router.delete("/:id", async function (req, res) {
  const id = req.params.id;
  res.send(await deleteItem("comment", id));
});

module.exports = router;
