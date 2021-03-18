const client = require('./client');

module.exports = {
    /**
     * Renvoie toutes les category dans la bdd trié par id
     */
    async findAllCategories() {
        const result = await client.query(`SELECT *
                                            FROM category
                                        ORDER BY id`);

        return result.rows;
    },

    /**
     * Renvoie une category par son id
     * @param {number} idCategory 
     */
    async findCategoryById(idCategory) {
        const result = await client.query(`SELECT *
                                            FROM category
                                        WHERE id = $1`, [idCategory]);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    }
}