// db.js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "", // your xampp mysql password
    database: "sasdb",
    waitForConnections: true,
    connectionLimit: 10,
});

console.log("MySQL Connected");

module.exports = pool;