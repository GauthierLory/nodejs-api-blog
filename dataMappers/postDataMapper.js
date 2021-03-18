const client = require('./client');

module.exports = {

    /**
     * Retourne la liste de tt les posts
     */
    async findAllPosts() {
        const result = await client.query(`SELECT *
                                            FROM post
                                        ORDER BY id`);

        return result.rows;
    },

    /**
     * Retourner le post pour l'id donné
     * @param {number} postId - Un id de post dans la base de données
     */
    async findPostById(postId) {
        const result = await client.query(`SELECT *
                                            FROM post
                                        WHERE id = $1`, [postId]);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },

    /**
     * Retourne les posts en fonction de l'id d'une category
     * @param {number} categoryId - Un id de category dans la base de données
     */
    async findPostsByCategoryId(categoryId) {
        const result = await client.query(`SELECT *
                                            FROM post
                                           WHERE category_id = $1
                                        ORDER BY id`, [categoryId]);

        return result.rows;
    }
};