const client = require('./client');

module.exports = {

    /**
     * Retourne la liste de tt les visitors
     */
    async findAllVisitors() {
        const result = await client.visitor.findMany();
        return result;
    },

    /**
     * Retourne un visitor par son id
     */
    async findVisitorById(visitorId) {
        const id =+ visitorId
        const result = await client.visitor.findFirst({
            where : { id : id }
        })
        return result;
    },

    async insertVisitor(visitor) {

        const result = await client.visitor.create({ data: visitor});
        return result;
    }
};