const express = require("express");
const Joi = require("joi");
const {
  getAllItems,
  deleteItem,
  getItemByAttribute,
  updateItem,
  getFilterItems,
  postItem,
} = require("../DB-requests/DB-requests");

var router = express.Router();

router.get("/", async function (req, res) {
  const conditions = req.query; // Assuming you're looking for a query parameter named "type"
  console.log("conditions11: ", conditions);
  if (JSON.stringify(conditions) === "{}") {
    console.log("ressdfaw1");
    res.send(await getAllItems("post"));
  } else {
    res.send(await getFilterItems("post", conditions));
  }
});

router.put("/:id", async function (req, res) {
  console.log("req.query.id: ", req.params.id);
  res.send(await updateItem("post", req.body, req.params.id));
});

const schema = Joi.object({
  user_id: Joi.required(),
  title: Joi.required(),
  body: Joi.required(),
});
router.get("/:id", async function (req, res) {
  const postId = req.params.id;
  console.log("postId: ", postId);
  res.send(await getItemByAttribute("post", postId, "id"));
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
