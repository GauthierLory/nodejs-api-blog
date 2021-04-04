const client = require('./client');

module.exports = {

    /**
     * Retourne la liste de tt les visitors
     */
    async findAllVisitors() {
        const result = await client.query(`SELECT * FROM visitor ORDER BY id`);
        return result.rows;
    },

    /**
     * Retourne un visitor par son id
     */
    async findVisitorById(visitorId) {
        const result = await client.query(`SELECT * FROM visitor WHERE id = $1`, [visitorId]);
        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },

    async insertVisitor(visitor) {
        const result = await client.query(`
            INSERT INTO visitor(email, password)
            VALUES ($1, $2)
            RETURNING *
        `, [visitor.email,visitor.password]);

        // Avec PG on peut ajouter un returning après un INSERT
        // Normalement une requête INSERT ne renvoit pas d'information
        // Mais avec le RETUNING la commande renverra les lignes inséré
        // (comme si on avait fait un SELECT dessus)

        return result.rows[0];
    }
};