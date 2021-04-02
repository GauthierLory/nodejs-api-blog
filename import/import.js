require('dotenv').config();
const { Client } = require('pg');

const posts = require('../data/posts.json');
const categories = require('../data/categories.json');
const visitors = require('../data/visitors.json');
const comments = require('../data/comments.json');
const { use } = require('chai');

const client = new Client({ connectionString: process.env.DATABASE_URL });

(async () => {

    await client.connect();

    await client.query('TRUNCATE TABLE category, post, visitor, comment RESTART IDENTITY');

    const categoryIdMap = {};

    for (let category of categories) {
        console.log('Insertion de la catégorie :', category.label);

        const result = await client.query(`INSERT INTO
            category(label, route) VALUES ($1, $2)
            RETURNING *
        `, [category.label, category.route]);

        const bddCategory = result.rows[0];
        console.log("bddCategory")
        console.log(bddCategory)

        categoryIdMap[bddCategory.label] = bddCategory.id
        console.log("categoryIdMap")
        console.log(categoryIdMap)
    }

    const postIdMap = {};

    for (let post of posts) {
        console.log('Insertion du post :', post.title);
        const result = await client.query(`INSERT INTO
            post(title, slug, excerpt, content, category_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [
            post.title,
            post.slug,
            post.excerpt,
            post.content,
            categoryIdMap[post.category]
        ]);
        const bddPost = result.rows[0];
        console.log(bddPost);
        postIdMap[bddPost.title] = bddPost.id
    }

    const visitorIdMap = {};
    for (let visitor of visitors) {
        console.log(`Insertion du visitor :`, visitor.email);
        const result = await client.query(`INSERT INTO
            visitor(email, password)
            VALUES($1, $2)
            RETURNING *`
            ,[
                visitor.email,
                visitor.password
            ]);
        const bddVisitor = result.rows[0];
        console.log(bddVisitor);
        visitorIdMap[bddVisitor.email] = bddVisitor.id
    }

    for (let comment of comments) {
        console.log(`Insertion du comment :`);
        await client.query(`INSERT INTO
            comment(visitor_id, post_id, content)
            VALUES($1, $2, $3)`
            ,[
                visitorIdMap[comment.visitor],
                postIdMap[comment.post],
                comment.content
            ]);
    }

    await client.end();

})();