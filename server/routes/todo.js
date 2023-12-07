const express = require("express");
const Joi = require("joi");
const {
  getAllItems,
  getItemByAttribute,
  deleteItem,
  getFilterItems,
  updateItem,
  postItem,
  getSortedItems,
} = require("../DB-requests/DB-requests");
const { loginTable } = require("../userAccess");

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
  console.log("loginTable: jfjhfhj", loginTable);

  const conditions = req.query; // Assuming you're looking for a query parameter named "type"
  if (JSON.stringify(conditions) === "{}") {
    console.log("ressdfaw1");
    res.send(await getAllItems("todo"));
  } else if (Object.keys(conditions)[1] === "_sort") {
    res.send(await getSortedItems("todo", conditions));
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
