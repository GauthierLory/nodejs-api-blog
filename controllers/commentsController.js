const postDataMapper = require('../dataMappers/postDataMapper');
const commentDataMapper = require('../dataMappers/commentDataMapper');

module.exports = {

    /**
     * Récupère l'ensemble des commentaires
     * @param {*} _
     * @param {*} response
     */
    async listComments(_, response) {
        const comments = await commentDataMapper.findAllComments();
        response.json({ data: comments });
    },

    /**
     * Récupère le commentaire par son id
     * @param {*} request
     * @param {*} response
     */
    async commentById(request, response) {
        const { commentId } = request.params;
        const post = await commentDataMapper.findCommentById(commentId);

        // Si post vaut null ou undefined
        if (!post) {
            response.status(404).json({ error: "Not found" });
        } else {
            response.json({ data: post });
        }

    },

    /**
     * Récupère la liste des commentaires par l'id du post
     * @param {*} request
     * @param {*} response
     */
    async commentsByPostId(request, response) {

        const { postId } = request.params;
        const comments = await commentDataMapper.findCommentsByPostId(postId);

        if (!comments.length) {
            response.status(404).json({ error: 'not found' });
        } else {
            response.json({ data: comments });
        }

    },

    /**
     * Permet la création d'un post
     * @param {*} request
     * @param {*} response
     */
    async createComment(request, response) {
        const commentData = request.body;

        const comment = await commentDataMapper.insertComment(commentData);
        response.status(201).json({ data: comment });
    },

    /**
     * Récupère le commentaire par son id pour le modifier
     * @param {*} request
     * @param {*} response
     */
    async editComment(request, response) {
        const { commentId } = request.params;
        const comment = await commentDataMapper.findCommentById(commentId);

        if (!comment) {
            response.status(404).json({ error: "Not found" });
        } else {
            const commentData = request.body;
            const comment = await commentDataMapper.editComment(commentId, commentData);
            response.status(201).json({ data: comment });
        }

    },

    /**
     * Permet la création d'un commentaire sur un post
     * @param {*} request
     * @param {*} response
     */
    async createComment(request, response){
        const commentData = request.body;
        const comment = await commentDataMapper.insertComment(commentData);
        response.status(201).json({ data: comment })
    },

    /**
     * Permet la suppression d'un commentaire
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    async deleteById(request, response){
        const { commentId } = request.params;
        const commentExist = await commentDataMapper.findCommentById(commentId);

        if (commentExist) {
            await commentDataMapper.deleteById(commentId);
            response.status(200).json({ message: 'done' });
        } else {
            response.status(404).json({ message: 'Not found' });
        }
    }
}