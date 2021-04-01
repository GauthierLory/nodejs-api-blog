const importer = require('./importer');
const { Client } = require('pg');


(async () => {

    const client = new Client(process.env.DATABASE_URL);
    await client.connect();

    importer.client = client;

    await client.end();
})();