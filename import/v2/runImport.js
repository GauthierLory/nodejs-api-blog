const importer = require('./importer');
const { Client } = require('pg');

const categories = require('../../data/categories.json');
const posts = require('../../data/posts.json');

(async () => {

    const client = new Client(process.env.DATABASE_URL);
    await client.connect();

    importer.client = client;

    await importer.run(categories, posts);

    await client.end();
})();