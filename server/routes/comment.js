const express = require("express");
const Joi = require("joi");
const executeQuery = require("../../DB/dbUtils").executeQuery;
var router = express.Router();

const schema = Joi.object({
  postId: Joi.required(),
  userId: Joi.required(),
  body: Joi.required(),
  title: Joi.required(),
});

router.post("/", async function (req, res) {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send("Bad Schema");
  }
  const addCommentQuery = `INSERT INTO comment (post_id, user_id, title, body)
    VALUES ('${req.body.postId}' , '${req.body.userId}' , '${req.body.title}', '${req.body.body}')`;
  try {
    const data = await executeQuery(addCommentQuery);
    res.send({
      id: data.insertId,
      postId: req.body.postId,
      userId: req.body.userId,
      title: req.body.title,
      body: req.body.body,
    });
  } catch {
    res.send("Error Adding Comment");
  }
});

router.delete("/:id", async function (req, res) {
  const id = req.params.id;
  const deleteCommentQuery = `DELETE FROM comment WHERE id = ${id};`;
  try {
    const comment = await executeQuery(`SELECT * FROM comment WHERE id=${id}`);
    const data = await executeQuery(deleteCommentQuery);

    console.log(data);
    res.send(comment[0]);
  } catch {
    res.send("Error Adding Comment");
  }
});

module.exports = router;
