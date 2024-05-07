const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "repertorio",
  password: "gongora",
  port: 5432,
});

// console.log(pool);



module.exports = pool;