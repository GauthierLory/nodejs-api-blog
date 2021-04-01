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

    after(async () => {
        await client.end();
    });
});