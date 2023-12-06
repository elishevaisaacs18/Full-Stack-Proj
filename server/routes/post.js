const express = require("express");
const Joi = require("joi");
const {
  getAllItems,
  deleteItem,
  getItemByAttribute,
} = require("../DB-requests/DB-requests");

var router = express.Router();

const schema = Joi.object({
  user_id: Joi.required(),
  title: Joi.required(),
  body: Joi.required(),
});
router.get("/", async function (req, res) {
  res.send(await getAllItems("post"));
});

router.post("/", async function (req, res) {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send("Bad Schema");
  }
  res.send(await postItem("post", req.body));
});

router.delete("/:id", async function (req, res) {
  const id = req.params.id;
  res.send(await deleteItem("post", id));
});

module.exports = router;
