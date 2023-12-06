const executeQuery = require("../../DB/dbUtils").executeQuery;

const getItemByAttributeFromDB = async (tableName, id, attribute) =>
  await executeQuery(`SELECT * FROM ${tableName} WHERE ${attribute}=${id}`);

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

const loginUserInDB = async (userLogin) =>
  await executeQuery(`SELECT user.id, user_name, full_name
    FROM user
    JOIN user_password
    ON user_password.user_id = user.id
    WHERE user_name = '${userLogin.user_name}' AND password = '${userLogin.password}';`);

module.exports = {
  getAllItemsFromDB,
  getItemByAttributeFromDB,
  deleteItemFromDB,
  postItemInDB,
  loginUserInDB,
};
