const categoryDataMapper = require('../dataMappers/categoryDataMapper');

module.exports = {

    /**
     * Liste l'ensemble des categories
     * @param {*} _ 
     * @param {*} response 
     */
    async listCategories(_, response) {
        const categories = await categoryDataMapper.findAllCategories();
        response.json({ data: categories });
    },
}