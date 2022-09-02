const client = require('./client');

module.exports = {

    /**
     * Retourne la liste de tout les comments
     * @returns {Promise<*>}
     */
    async findAllComments() {
        const result = await client.comment.findMany();
        return result;
    },

    /**
     * Retourner le comment pour l'id donné
     * @param commentId
     * @returns {Promise<*>}
     */
    async findCommentById(commentId) {
        const id = +commentId;
        const result = await client.comment.findFirst({
            where : { id : id }
        })
        return result;
    },

    /**
     * Retourne les comments en fonction de l'id d'un post
     * @param postId
     * @returns {Promise<*>}
     */
    async findCommentsByPostId(postId) {
        const id = +postId;
        const result = await client.comment.findMany({
            where : {
                post : { id }
            }
        })
        return result;
    },

    /**
     * @param comment
     * @returns {Promise<*>}
     */
    async insertComment(comment) {
        const result = await client.comment.create({ data: comment })
        return result
    },

    /**
     * @param comment
     * @returns {Promise<*>}
     */
    async editComment(commentId, comment) {
        const id = +commentId;
        const result = await client.comment.update({
            where: { id },
            data: comment
        })
        return result
    },

    /**
     * @param commentId
     * @returns {Promise<*>}
     */
    async deleteById(commentId) {
        const id = +commentId;
        const result = await client.comment.delete({
            where: { id }
        })
        return result
    }
};
