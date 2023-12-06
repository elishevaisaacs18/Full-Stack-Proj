const express = require("express");
const Joi = require("joi");
const executeQuery = require("../../DB/dbUtils").executeQuery;
var router = express.Router();

const schema = Joi.object({
  userId: Joi.required(),
  completed: Joi.required(),
  title: Joi.required(),
});

router.post("/", async function (req, res) {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send("Bad Schema");
  }
  const addPostQuery = `INSERT INTO todo (post_id, user_id, title, body)
    VALUES ('${req.body.userId}' , '${req.body.title}', '${req.body.completed}')`;
  try {
    const data = await executeQuery(addPostQuery);
    res.send({
      id: data.insertId,
      userId: req.body.userId,
      title: req.body.title,
      completed: req.body.completed,
    });
  } catch {
    res.send("Error Adding Todo");
  }
});

router.delete("/:id", async function (req, res) {
    const id = req.params.id;
    const deleteTodoQuery = `DELETE FROM todo WHERE id = ${id};`;
    try {
      const todo = await executeQuery(`SELECT * FROM todo WHERE id=${id}`);
      const data = await executeQuery(deleteTodoQuery);
  
      console.log(data);
      res.send(todo[0]);
    } catch {
      res.send("Error Adding Todo");
    }
  });

module.exports = router;
