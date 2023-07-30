const { Pool } = require("pg");
require('dotenv').config()

const pool = new Pool({
  host: process.env.host,
  user: process.env.user,
  port: process.env.port,
  password: process.env.password,
  database: process.env.database,
  dialect: process.env.dialect,
});
module.exports = {
  query: (text, params) => pool.query(text, params)
};