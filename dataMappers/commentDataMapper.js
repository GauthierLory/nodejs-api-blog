const client = require('./client');

module.exports = {

    /**
     * Retourne la liste de tt les posts
     */
    async findAllComments() {
        const result = await client.comment.findMany();
        return result;
    },

    /**
     * Retourner le post pour l'id donné
     * @param {number} postId - Un id de post dans la base de données
     */
    async findCommentById(commentId) {
        const id = +commentId;
        console.log(typeof(id))
        const result = await client.comment.findFirst({
            where : { id : id }
        })

        return result;
    },

    /**
     * Retourne les posts en fonction de l'id d'une category
     * @param {number} categoryId - Un id de category dans la base de données
     */
    async findCommentsByPostId(postId) {
        const id = +postId;
        const result = await client.comment.findMany({
            where : { post_id : id }
        })
        return result;

    },

    /**
     * @param post
     * @returns {Promise<*>}
     */
    async insertComment(comment) {
        console.log(comment)
        const result = await client.comment.create({ data: comment })
        return result
    },

    /**
     * @param post
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

    async deleteById(commentId) {
        const id = +commentId;
        const result = await client.comment.delete({
            where: { id }
        })
        return result
    }
};