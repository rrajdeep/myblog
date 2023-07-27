const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "myblogdb"
}).promise();

const result = await pool.query("SELECT * FROM blogs");
console.log(result);