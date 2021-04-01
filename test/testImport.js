require('dotenv').config();
require('chai').should();

const { Client } = require('pg');

const importer = require('../import/v2/importer');

const client = new Client(process.env.TEST_DATABASE_URL);

describe('Import system', () => {
    before(async () => {
        await client.connect();

        importer.client = client;
    });

    describe('clearDataBase()', () => {
        before(async () => {
            await client.query(`INSERT INTO category(route, label)
                                VALUES ('coucou', 'pan'),
                                       ('riri', 'fifi'),
                                       ('foo', 'bar')`);
        });
        it('should remove all data in database', async () => {
            await importer.clearDataBase();
            const result = await client.query('SELECT * FROM category');
            result.rowCount.should.be.eql(0);
        });
    });

    describe('extractCategoryData()', () => {
        it('should return un orderd array with category information', async () => {
            importer.extractCategoryData({
                route: "/react",
                label: "React"
            }).should.be.eql(['React', '/react']);
        });
    });

    describe('createCategory()', () => {
        it('should add a category in database', async () => {
            await importer.createCategory({
                route: "/react",
                label: "React"
            });

            const result = await client.query(`SELECT * FROM category
                                                WHERE route = '/react' AND label = 'React'`);
            result.rowCount.should.be.eql(1);
        });
    });

    describe('extractPostData()', () => {
        it('should return un orderd array with Post information', async () => {
            importer.extractPostData({
                "category": "O’clock",
                "slug": "oclock-une-vraie-bonne-ecole",
                "title": "O’clock, une vraie bonne école ?",
                "excerpt": "Lorem ipsum dolor sit amet, <em>consectetur adipisicing</em> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur <strong>sint occaecat cupidatat</strong> non proident, sunt in culpa qui officia deserunt mollit <em>anim id est</em> laborum. <img onload=\"javascript:(function(){window.location.href = 'https://oclock.io'})()\" src=\"https://images.pexels.com/photos/1154775/pexels-photo-1154775.jpeg?auto=compress&cs=tinysrgb&h=200&w=133\" alt=\"\"> Ut enim ad minim veniam, quis nostrud exercitation ullamco <strong>laboris nisi</strong> ut aliquip ex ea commodo consequat.",
                "content": "O’clock, une vraie bonne école ? Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            }).should.be.eql([
                'oclock-une-vraie-bonne-ecole',
                'O’clock, une vraie bonne école ?',
                "Lorem ipsum dolor sit amet, <em>consectetur adipisicing</em> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur <strong>sint occaecat cupidatat</strong> non proident, sunt in culpa qui officia deserunt mollit <em>anim id est</em> laborum. <img onload=\"javascript:(function(){window.location.href = 'https://oclock.io'})()\" src=\"https://images.pexels.com/photos/1154775/pexels-photo-1154775.jpeg?auto=compress&cs=tinysrgb&h=200&w=133\" alt=\"\"> Ut enim ad minim veniam, quis nostrud exercitation ullamco <strong>laboris nisi</strong> ut aliquip ex ea commodo consequat.",
                "O’clock, une vraie bonne école ? Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                'O’clock',
            ]);
        });
    });

    describe('createPost()', () => {
        it('should add a post in database', async () => {

            importer.createCategory({
                label: "O’clock",
                route: '/oclock'
            });

            await importer.createPost({
                "category": "O’clock",
                "slug": "oclock-une-vraie-bonne-ecole",
                "title": "O’clock, une vraie bonne école ?",
                "excerpt": "Lorem ipsum dolor sit amet, <em>consectetur adipisicing</em> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur <strong>sint occaecat cupidatat</strong> non proident, sunt in culpa qui officia deserunt mollit <em>anim id est</em> laborum. <img onload=\"javascript:(function(){window.location.href = 'https://oclock.io'})()\" src=\"https://images.pexels.com/photos/1154775/pexels-photo-1154775.jpeg?auto=compress&cs=tinysrgb&h=200&w=133\" alt=\"\"> Ut enim ad minim veniam, quis nostrud exercitation ullamco <strong>laboris nisi</strong> ut aliquip ex ea commodo consequat.",
                "content": "O’clock, une vraie bonne école ? Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            });

            const result = await client.query(`SELECT * FROM post
                                                WHERE slug = 'oclock-une-vraie-bonne-ecole'`);
            result.rowCount.should.be.eql(1);
            result.rows[0].should.include.keys(['slug', 'title', 'excerpt', 'content']);
            result.rows[0].title.should.be.eql('O’clock, une vraie bonne école ?');
            result.rows[0].slug.should.be.eql('oclock-une-vraie-bonne-ecole');
            result.rows[0].excerpt.should.be.eql("Lorem ipsum dolor sit amet, <em>consectetur adipisicing</em> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur <strong>sint occaecat cupidatat</strong> non proident, sunt in culpa qui officia deserunt mollit <em>anim id est</em> laborum. <img onload=\"javascript:(function(){window.location.href = 'https://oclock.io'})()\" src=\"https://images.pexels.com/photos/1154775/pexels-photo-1154775.jpeg?auto=compress&cs=tinysrgb&h=200&w=133\" alt=\"\"> Ut enim ad minim veniam, quis nostrud exercitation ullamco <strong>laboris nisi</strong> ut aliquip ex ea commodo consequat.");
            result.rows[0].content.should.be.eql("O’clock, une vraie bonne école ? Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
        });
    });

    describe('run()', () => {
        it('should clear database and load provided data', async () => {
            const categories = [
                {
                    label: "O’clock",
                    route: '/oclock'
                },
                {
                    label: "O’clock 2",
                    route: '/oclock-2'
                }
            ];

            const posts = [
                {
                    "category": "O’clock",
                    "slug": "angular-une-fausse-bonne-idee",
                    "title": "Angular, une fausse bonne idée ?",
                    "excerpt": "Lorem <em>ipsum dolor</em> sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <strong>Ut enim ad minim</strong> veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea <strong>commodo consequat</strong>. Duis aute irure dolor in reprehenderit in voluptate velit esse <em>cillum dolore</em> eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    "content": "Angular, une fausse bonne idée ? Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                },
                {
                    "category": "O’clock",
                    "slug": "react-une-vraie-bonne-idee",
                    "title": "React, une vraie bonne idée ?",
                    "excerpt": "Ut enim ad <em>minim veniam</em>, quis nostrud exercitation ullamco <strong>laboris nisi</strong> ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et <em>dolore magna</em> aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui <strong>officia deserunt mollit</strong> anim id est laborum.",
                    "content": "React, une vraie bonne idée ? Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                },
                {
                    "category": "O’clock",
                    "slug": "oclock-une-vraie-bonne-ecole",
                    "title": "O’clock, une vraie bonne école ?",
                    "excerpt": "Lorem ipsum dolor sit amet, <em>consectetur adipisicing</em> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur <strong>sint occaecat cupidatat</strong> non proident, sunt in culpa qui officia deserunt mollit <em>anim id est</em> laborum. <img onload=\"javascript:(function(){window.location.href = 'https://oclock.io'})()\" src=\"https://images.pexels.com/photos/1154775/pexels-photo-1154775.jpeg?auto=compress&cs=tinysrgb&h=200&w=133\" alt=\"\"> Ut enim ad minim veniam, quis nostrud exercitation ullamco <strong>laboris nisi</strong> ut aliquip ex ea commodo consequat.",
                    "content": "O’clock, une vraie bonne école ? Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                }
            ];

            await importer.run(categories, posts);

            let result = await client.query('SELECT * FROM post');
            result.rowCount.should.be.eql(3);
            result.rows.filter(post => post.slug == 'angular-une-fausse-bonne-idee').length.should.be.eql(1);
            result.rows.filter(post => post.slug == 'react-une-vraie-bonne-idee').length.should.be.eql(1);
            result.rows.filter(post => post.slug == 'oclock-une-vraie-bonne-ecole').length.should.be.eql(1);
        });
    });

    after(async () => {
        await client.end();
    });
});