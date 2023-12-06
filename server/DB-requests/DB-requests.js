const {
  getAllItemsFromDB,
  getItemByIdFromDB,
  deleteItemFromDB,
  postItemInDB,
} = require("./DB-SQL-requests");

const getAllItems = async (tableName) => {
  try {
    const data = await getAllItemsFromDB(tableName);
    return data;
  } catch {
    return "Error Getting Items";
  }
};

const deleteItem = async (tableName, id) => {
  try {
    const comment = await getItemById(tableName, id);
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

const getItemById = async (tableName, id) => {
  try {
    const data = await getItemByIdFromDB(tableName, id);
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

module.exports = { getAllItems, getItemById, deleteItem, postItem };
