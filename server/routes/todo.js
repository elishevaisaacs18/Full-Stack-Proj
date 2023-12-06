const express = require("express");
const Joi = require("joi");
const {
  getAllItems,
  getItemByAttribute,
  deleteItem,
  updateItem,
} = require("../DB-requests/DB-requests");

var router = express.Router();

const schema = Joi.object({
  user_id: Joi.required(),
  completed: Joi.required(),
  title: Joi.required(),
});

router.patch("/:id", async function (req, res) {
  res.send(await updateItem("todo", req.body, req.params.id));
});

router.get("/", async function (req, res) {
  res.send(await getAllItems("todo"));
});

router.post("/", async function (req, res) {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send("Bad Schema");
  }
  res.send(await postItem("todo", req.body));
});

router.delete("/:id", async function (req, res) {
  const id = req.params.id;
  res.send(await deleteItem("todo", id));
});

module.exports = router;
