const { Pool } = require('pg');

const client = new Pool({
    connectionString: process.env.PG_URL,
});

module.exports = client;