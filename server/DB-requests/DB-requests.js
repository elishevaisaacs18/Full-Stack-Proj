const {
  getAllItemsFromDB,
  getItemByAttributeFromDB,
  deleteItemFromDB,
  postItemInDB,
  loginUserInDB,
} = require("./DB-SQL-requests");

const getAllItems = async (tableName) => {
  try {
    return await getAllItemsFromDB(tableName);
  } catch {
    return "Error Getting Items";
  }
};

const deleteItem = async (tableName, id) => {
  try {
    const comment = await getItemByAttribute(tableName, id, "id");
    const data = await deleteItemFromDB(tableName, id);
    if (data.affectedRows == 0) {
      throw new Error("Error deleting Comment");
    }
    console.log(data, "im dava");
    return comment[0];
  } catch (e) {
    return e.message;
  }
};

const getItemByAttribute = async (tableName, id) => {
  try {
    const data = await getItemByAttributeFromDB(tableName, id, "id");
    return data;
  } catch {
    return "Error Getting Item";
  }
};

const postItem = async (tableName, body) => {
  try {
    return await postItemInDB(tableName, body);
  } catch {
    return "Error Adding Comment";
  }
};

const loginUser = async (userLogin) => {
  try {
    const user = await loginUserInDB(userLogin);
    if (user.length) return user;
    else throw new Error("Your user name or password is incorrect");
  } catch (e) {
    return e.message;
  }
};

module.exports = {
  getAllItems,
  getItemByAttribute,
  deleteItem,
  postItem,
  loginUser,
};
