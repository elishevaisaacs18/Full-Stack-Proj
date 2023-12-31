const {
  getAllItemsFromDB,
  getItemByAttributeFromDB,
  deleteItemFromDB,
  postItemInDB,
  loginUserInDB,
  updateItemByAttributeInDB,
  getFilterItemsFromDB,
  getSortedItemsFromDB,
} = require("./DB-SQL-requests");

const getAllItems = async (tableName) => {
  try {
    const res = await getAllItemsFromDB(tableName);
    return res;
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
    return comment[0];
  } catch (e) {
    return e.message;
  }
};

const getItemByAttribute = async (tableName, id, attribute) => {
  try {
    const data = await getItemByAttributeFromDB(tableName, id, attribute);
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

const updateItem = async (tableName, updateItem, id) => {
  try {
    const response = await updateItemByAttributeInDB(tableName, updateItem, id);
    if (response.affectedRows == 1) {
      return await getItemByAttribute(tableName, id, "id");
    } else return response;
  } catch (e) {
    return e.message;
  }
};

const getFilterItems = async (tableName, conditions) => {
  try {
    return await getFilterItemsFromDB(tableName, conditions);
  } catch (e) {
    return e.message;
  }
};

const getSortedItems = async (tableName, conditions) => {
  try {
    return await getSortedItemsFromDB(tableName, conditions);
  } catch (e) {
    return e.message;
  }
};

module.exports = {
  getSortedItems,
  getAllItems,
  getItemByAttribute,
  deleteItem,
  postItem,
  loginUser,
  updateItem,
  getFilterItems,
};
