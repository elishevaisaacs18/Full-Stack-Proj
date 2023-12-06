const express = require("express");
const Joi = require("joi");
const executeQuery = require("../../DB/dbUtils").executeQuery;
var router = express.Router();

router.get("/", async function (req, res) {
  const getAllTodo = `SELECT * FROM todo;`;
  try {
    const data = await executeQuery(getAllTodo);
    console.log("data: ", data);
    res.send({
      data,
    });
  } catch {
    res.send("Error Adding School");
  }
});

module.exports = router;
