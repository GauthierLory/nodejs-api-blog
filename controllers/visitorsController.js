const visitorDataMapper = require('../dataMappers/visitorDataMapper');


module.exports = {
    
    /**
     * Récupère l'ensemble des visitors
     * @param {*} _ 
     * @param {*} response 
     */
    async listVisitors(_, response) {
        const visitors = await visitorDataMapper.findAllVisitors();
        response.json({ data: visitors });
    },

    /**
     * Récupère le visitor par son id
     * @param {*} request 
     * @param {*} response 
     */
    async visitorById(request, response) {

        const { visitorId } = request.params;
        const visitor = await visitorDataMapper.findVisitorById(visitorId);

        // Si visitor vaut null ou undefined
        if (!visitor) {
            response.status(404).json({ error: "Not found" });
        } else {
            response.json({ data: visitor });
        }

    },


    /**
     * Permet la création d'un visitor
     * @param {*} request 
     * @param {*} response 
     */
    async createVisitor(request, response) {

        try {
            const visitorData = request.body;
            const visitor = await visitorDataMapper.insertVisitor(visitorData);
            response.status(201).json({ data: visitor });
        }    catch (e) {
            response.status(404).json({ error: e });
        }
    },

}