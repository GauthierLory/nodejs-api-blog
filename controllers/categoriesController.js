const categoryDataMapper = require('../dataMappers/categoryDataMapper');

module.exports = {

    /**
     * Liste l'ensemble des categories
     * @param _
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async listCategories(_, response, next) {
        try {
            const categories = await categoryDataMapper.findAllCategories();
            if(categories) {
                response.status(200).json({ data: categories });
            } else {
                response.status(404).json({ error: "Categories not found" });
            }
        } catch(error) {
            next(error)
        }
    },

    /**
     * Récupère la categorie par son id
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async categoryById (request, response, next) {
        try {
            const { categoryId } = request.params;
            const category = await categoryDataMapper.findCategoryById(categoryId)
            if (category) {
                response.status(200).json({ data: category });
            } else {
                response.status(404).json({ error: "Category not found" });
            }
        } catch(error) {
            next(error)
        }
    }
}