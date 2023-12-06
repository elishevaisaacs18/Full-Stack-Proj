const express = require("express");
const Joi = require("joi");
const executeQuery = require("../../DB/dbUtils").executeQuery;
var router = express.Router();

router.get("/", async function (req, res) {
  const getAllComment = `SELECT * FROM comment;`;
  try {
    const data = await executeQuery(getAllComment);
    console.log("data: ", data);
    res.send({
      data,
    });
  } catch {
    res.send("Error Adding School");
  }
});

module.exports = router;
