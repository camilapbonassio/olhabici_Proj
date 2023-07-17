require('dotenv').config();
const Pool = require('pg').Pool

const pool = new Pool( {
    host: "127.0.0.1",
    user: "camila",
    port: 5432,
    password: "tapirus",
    database: "monitoramento",
    dialect: "postgres"
  });

  module.exports = pool;