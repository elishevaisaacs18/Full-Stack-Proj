const express = require("express");
const Joi = require("joi");
const {
  getAllItems,
  getItemByAttribute,
  deleteItem,
  getFilterItems,
  updateItem,
} = require("../DB-requests/DB-requests");

var router = express.Router();

const schema = Joi.object({
  user_id: Joi.required(),
  completed: Joi.required(),
  title: Joi.required(),
});

router.put("/:id", async function (req, res) {
  res.send(await updateItem("todo", req.body));
});

router.get("/", async function (req, res) {
  const conditions = req.query; // Assuming you're looking for a query parameter named "type"
  console.log("conditions11: ", conditions);
  if (JSON.stringify(conditions) === "{}") {
    console.log("ressdfaw1");
    res.send(await getAllItems("todo"));
  } else {
    res.send(await getFilterItems("todo", conditions));
  }
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
