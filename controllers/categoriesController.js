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

    async categoryById (request, response) {
        const { categoryId } = request.params;
        const categories = await categoryDataMapper.findCategoryById(categoryId)

        // Si post vaut null ou undefined
        if (!categories) {
            response.status(404).json({ error: "Not found" });
        } else {
            response.json({ data: categories });
        }
    }
}