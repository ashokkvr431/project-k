const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",     // your MySQL host
  user: "root",          // your MySQL username
  password: "", // your MySQL password
  database: "myapp_db" // your MySQL database
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database");
});

module.exports = db;
