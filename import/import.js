require('dotenv').config();
const { Client } = require('pg');

const posts = require('../data/posts.json');
const categories = require('../data/categories.json');

const client = new Client({ connectionString: process.env.DATABASE_URL });

(async () => {

    await client.connect();

    await client.query('TRUNCATE TABLE category, post RESTART IDENTITY');

    const categoryIdMap = {};

    for (let category of categories) {
        console.log('Insertion de la catégorie :', category.label);

        const result = await client.query(`INSERT INTO
            category(label, route) VALUES ($1, $2)
            RETURNING *
        `, [category.label, category.route]);

        const bddCategory = result.rows[0];

        categoryIdMap[bddCategory.label] = bddCategory.id
    }

    for (let post of posts) {
        console.log('Insertion du post :', post.title);
        await client.query(`INSERT INTO
            post(title, slug, excerpt, content, category_id)
            VALUES ($1, $2, $3, $4, $5)
        `, [
            post.title,
            post.slug,
            post.excerpt,
            post.content,
            categoryIdMap[post.category]
        ]);
    }

    await client.end();

})();