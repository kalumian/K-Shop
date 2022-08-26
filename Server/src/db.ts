import { config } from "dotenv";
import mysql from "mysql2";
config();

const { DB_HOST, DB_PASSWORD, DB_USER, DB_NAME } = process.env;
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});
export const db = pool.promise();
