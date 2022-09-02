const visitorDataMapper = require('../dataMappers/visitorDataMapper');


module.exports = {

    /**
     * Récupère l'ensemble des visitors
     * @param {*} _
     * @param {*} response
     * @param next
     * @returns {Promise<void>}
     */
    async listVisitors(_, response, next) {
        try {
            const visitors = await visitorDataMapper.findAllVisitors();
            if (visitors) {
                response.status(200).json({ data: visitors });
            }else {
                response.status(404).json({ error: "Visitors not found" });
            }
        } catch (error) {
            next(error)
        }
    },

    /**
     * Récupère le visitor par son id
     * @param {*} request
     * @param {*} response
     * @param next
     * @returns {Promise<void>}
     */
    async visitorById(request, response, next) {
        try {
            const { visitorId } = request.params;
            const visitor = await visitorDataMapper.findVisitorById(visitorId);
            if (visitor) {
                response.status(200).json({ data: visitor });
            } else {
                response.status(404).json({ error: "Visitors not found" });
            }
        } catch (error) {
            next(error)
        }
    },

    /**
     * Permet la création d'un visitor
     * @param {*} request
     * @param {*} response
     * @param next
     * @returns {Promise<void>}
     */
    async createVisitor(request, response, next) {
        try {
            const visitorData = request.body;
            const visitor = await visitorDataMapper.insertVisitor(visitorData);
            if (visitor) {
                response.status(201).json({ data: visitor });
            }else {
                response.status(404).json({ message: "not found" });
            }
        }   catch (error) {
            next(error)
        }
    },

}