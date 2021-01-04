const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'meeko',
  host: 'localhost',
  database: 'spotted',
  password: 'password',
  port: 5432,
});

module.exports = pool;
