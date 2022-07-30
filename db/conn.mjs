import mysql from "mysql";

const conn = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "0618",
  database: "psite",
  charset: "utf8mb4", // 支持emoji😄
});

export default conn;
