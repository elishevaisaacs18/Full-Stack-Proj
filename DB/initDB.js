const mysql = require("mysql");
const fs = require("node:fs");
const path = require("path");
var { executeQuery, con } = require("./dbUtils");

async function initDB() {
  const queriesArr = [];
  const paths = await fs.promises.readdir(
    path.resolve(__dirname, "./entities")
  );
  for (const filePath of paths) {
    const tableName = filePath.split(".")[0];
    const file = await JSON.parse(
      await fs.promises.readFile(
        path.resolve(__dirname, "./entities/" + filePath),
        "utf-8"
      )
    ).columns;

    let createTableSQL = "";
    file.forEach((field, index) => {
      for (const fieldAttribute in field) {
        if (fieldAttribute === "name" || fieldAttribute === "type") {
          createTableSQL += field[fieldAttribute] + " ";
        } else {
          if (field[fieldAttribute]) {
            createTableSQL += fieldAttribute + " ";
          }
        }
      }
      if (index !== file.length - 1) {
        createTableSQL += ",";
      }
    });
    const query = `
      CREATE TABLE IF NOT EXISTS ${tableName} (${createTableSQL});
    `;

    queriesArr.push(query.trim());
  }

  return queriesArr;
}

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "z10mz10m",
//   database: "school",
//   multipleStatements: true,
// });

async function createTables() {
  const tableCreationQueries = await initDB();
  tableCreationQueries.forEach(async (query) => {
    await executeQuery(query);
  });
  con.end();
}

createTables();
