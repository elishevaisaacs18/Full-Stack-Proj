const express = require("express");
const Joi = require("joi");
const executeQuery = require("../../DB/dbUtils").executeQuery;
var router = express.Router();

const schema = Joi.object({
  userId: Joi.required(),
  title: Joi.required(),
  body: Joi.required(),
});

router.post("/", async function (req, res) {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send("Bad Schema");
  }
  const addPostQuery = `INSERT INTO post (user_id, title, body)
    VALUES ('${req.body.userId}' , '${req.body.title}', '${req.body.body}')`;
  try {
    const data = await executeQuery(addPostQuery);
    res.send({
      id: data.insertId,
      userId: req.body.userId,
      title: req.body.title,
      body: req.body.body,
    });
  } catch {
    res.send("Error Adding School");
  }
});

module.exports = router;
