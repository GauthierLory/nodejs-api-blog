const client = require('./client');

module.exports = {

    /**
     * Renvoie toutes les category dans la bdd trié par id
     */
    async findAllCategories() {
        const result = await client.category.findMany();
        return result;
    },

    /**
     * Renvoie une category par son id
     * @param {number} idCategory 
     */
    async findCategoryById(idCategory) {

        const id = +idCategory;
        const result = await client.category.findFirst({
            where: {id : id}
        })
        return result;
    }
}