const express = require("express");
const Joi = require("joi");
const executeQuery = require("../../DB/dbUtils").executeQuery;
var router = express.Router();

// const schema = Joi.object({
//   user_name: Joi.string().alphanum().min(3).max(30).required(),
//   school_code: Joi.number().integer().min(0).max(10000).required(),
// });

// router.post("/", async function (req, res) {
//   const { error } = schema.validate(req.body);
//   if (error) {
//     console.log(error);
//     return res.status(400).send("Bad Schema");
//   }
//   const addUserQuery = `INSERT INTO user (school_name, school_code)
//     VALUES ('${req.body.school_name}' , '${req.body.school_code}')`;
//   try {
//     const data = await executeQuery(addSchoolQuery);
//     res.send(data);
//     console.log(data);
//   } catch {
//     res.send("Error Adding School");
//   }
// });
