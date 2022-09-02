const postDataMapper = require('../dataMappers/postDataMapper');
const commentDataMapper = require('../dataMappers/commentDataMapper');

module.exports = {

    /**
     * Récupère l'ensemble des commentaires
     * @param _
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async listComments(_, response, next) {
        try {
            const comments = await commentDataMapper.findAllComments();
            if (comments) {
                response.json({ data: comments });
            } else {
                response.status(404).json("Comments not found")
            }
        } catch (error) {
            next(error)
        }
    },

    /**
     * Récupère le commentaire par son id
     * @param {*} request
     * @param {*} response
     * @param next
     * @returns {Promise<void>}
     */
    async commentById(request, response, next) {
        try {
            const { commentId } = request.params;
            const post = await commentDataMapper.findCommentById(commentId);
            if (!post) {
                response.status(404).json({ error: "Comment not found" });
            } else {
                response.json({ data: post });
            }
        } catch (error) {
            next(error)
        }
    },

    /**
     * Récupère la liste des commentaires par l'id du post
     * @param {*} request
     * @param {*} response
     * @param next
     * @returns {Promise<void>}
     */
    async commentsByPostId(request, response, next) {
        try {
            const { postId } = request.params;
            const post = await postDataMapper.findPostById(postId);
            if (post) {
                const comments = await commentDataMapper.findCommentsByPostId(postId);
                response.json({ data: comments });
            } else {
                response.status(404).json({ error: 'Comments not found' });
            }
        } catch (error) {
            next(error)
        }
    },

    /**
     * Permet la création d'un post
     * @param {*} request
     * @param {*} response
     * @param next
     * @returns {Promise<void>}
     */
    async createComment(request, response, next) {
        try {
            const { postId } = request.params;
            const commentData = request.body;
            const post = await postDataMapper.findPostById(postId);
            if (post) {
                const comment = await commentDataMapper.insertComment(commentData);
                response.json({ data: comment });
            } else {
                response.status(404).json({ error: 'Comment not found' });
            }
        } catch (error) {
            next(error)
        }
    },

    /**
     * Récupère le commentaire par son id pour le modifier
     * @param {*} request
     * @param {*} response
     * @param next
     * @returns {Promise<void>}
     */
    async editComment(request, response, next) {
        try {
            const { commentId } = request.params;
            const comment = await commentDataMapper.findCommentById(commentId);
            if (comment) {
                const commentData = request.body;
                const editComment = await commentDataMapper.editComment(commentId, commentData);
                response.status(201).json({ data: editComment });
            } else {
                response.status(404).json({ error: "Comment not found" });
            }
        } catch (error) {
            next(error)
        }
    },

    /**
     * Permet la création d'un commentaire sur un post
     * @param {*} request
     * @param {*} response
     * @param next
     * @returns {Promise<void>}
     */
    async createComment(request, response, next){
        try {
            const commentData = request.body;
            const comment = await commentDataMapper.insertComment(commentData);
            response.status(201).json({ data: comment })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Permet la suppression d'un commentaire
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async deleteById(request, response, next){
        const { commentId } = request.params;
        try {
            const commentExist = await commentDataMapper.findCommentById(commentId);

            if (commentExist) {
                await commentDataMapper.deleteById(commentId);
                response.status(200).json({ message: 'Deleted' });
            } else {
                response.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            next(error)
        }
    }

}
