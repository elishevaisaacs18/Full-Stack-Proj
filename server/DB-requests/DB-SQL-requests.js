const { query } = require("express");
const executeQuery = require("../../DB/dbUtils").executeQuery;
const getItemByAttributeFromDB = async (tableName, id, attribute) =>
  await executeQuery(`SELECT * FROM ${tableName} WHERE ${attribute}=${id};`);
const getAllItemsFromDB = async (tableName) =>
  await executeQuery(`SELECT * FROM full_stack_proj.${tableName}`);
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

const loginUserInDB = async (userLogin) =>
  await executeQuery(`SELECT user.id, user_name, full_name
    FROM user
    JOIN user_password
    ON user_password.user_id = user.id
    WHERE user_name = '${userLogin.user_name}' AND password = '${userLogin.password}';`);

const updateItemByAttributeInDB = async (tableName, updateItem, id) => {
  let rowChange = "";
  const fields = Object.keys(updateItem);
  const length = fields.length;
  fields.forEach((field, index) => {
    rowChange += `${field} = `;
    const value = updateItem[field];
    if (typeof value === "string") rowChange += `"${value}"`;
    else rowChange += value;

    if (index != length - 1) {
      rowChange += ",";
    }
  });

  return await executeQuery(
    `UPDATE ${tableName} SET ${rowChange} WHERE id = ${id};`
  );
};

const getFilterItemsFromDB = async (tableName, conditionsObj) => {
  let conditionsSql = "";
  const conditions = Object.keys(conditionsObj);
  const length = conditions.length;
  conditions.forEach((condition, index) => {
    conditionsSql += `${condition} = `;
    const value = conditionsObj[condition];
    if (typeof value === "string") conditionsSql += `"${value}"`;
    else conditionsSql += value;

    if (index != length - 1) {
      conditionsSql += " AND ";
    }
  });
  const res = await executeQuery(
    ` SELECT *FROM ${tableName} WHERE ${conditionsSql}`
  );
  return res;
};

const getSortedItemsFromDB = async (tableName, conditions) => {
  let data;
  switch (conditions._sort) {
    case "id":
    case "title":
      data = await executeQuery(
        `SELECT * FROM ${tableName}  WHERE user_id = ${conditions.user_id} ORDER BY ${conditions._sort}`
      );
      break;
    case "completed":
      data = await executeQuery(
        `SELECT * FROM ${tableName} WHERE user_id = ${conditions.user_id} ORDER BY ${conditions._sort} DESC`
      );
      break;
    case "random":
      data = await executeQuery(
        `SELECT * FROM ${tableName} WHERE user_id = ${conditions.user_id} ORDER BY RAND()`
      );
      break;
    default:
      data = "cannot sort items";
      break;
  }

  return data;
};

module.exports = {
  getAllItemsFromDB,
  getItemByAttributeFromDB,
  deleteItemFromDB,
  postItemInDB,
  loginUserInDB,
  updateItemByAttributeInDB,
  getFilterItemsFromDB,
  getSortedItemsFromDB,
};
