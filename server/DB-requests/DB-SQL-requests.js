const executeQuery = require("../../DB/dbUtils").executeQuery;
const getItemByIdFromDB = async (tableName, id) =>
  await executeQuery(`SELECT * FROM ${tableName} WHERE id=${id}`);
const getAllItemsFromDB = async (tableName) =>
  await executeQuery(`SELECT * FROM ${tableName}`);
const deleteItemFromDB = async (tableName, id) =>
  await executeQuery(`DELETE FROM ${tableName} WHERE id = ${id};`);
const postItemInDB = async (tableName, body) => {
  let valuesSQL = "";
  let fieldSQL = "";
  const fields = Object.keys(body);
  const length = fields.length;
  fields.forEach((field, index) => {
    const value = body[field];
    if (typeof value === "string") valuesSQL += `"${value}"`;
    else valuesSQL += value;
    fieldSQL += field;

    if (index != length - 1) {
      valuesSQL += ",";
      fieldSQL += ",";
    }
  });
  const data = await executeQuery(
    `INSERT INTO ${tableName} (${fieldSQL}) VALUES (${valuesSQL});`
  );

  return {
    ...body,
    id: data.insertId,
  };
};
module.exports = {
  getAllItemsFromDB,
  getItemByIdFromDB,
  deleteItemFromDB,
  postItemInDB,
};
