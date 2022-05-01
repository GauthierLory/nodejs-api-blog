const client = require('./client');

module.exports = {

    /**
     * Retourne la liste de tt les posts
     */
    async findAllPosts() {
        const result = await client.post.findMany();
        return result;
    },

    /**
     * Retourner le post pour l'id donné
     * @param {number} postId - Un id de post dans la base de données
     */
    async findPostById(postId) {
        const id = +postId;
        const result = await client.post.findFirst({
            where : { id : id }
        })

        return result;
    },

    /**
     * Retourne les posts en fonction de l'id d'une category
     * @param {number} categoryId - Un id de category dans la base de données
     */
    async findPostsByCategoryId(categoryId) {
        const id = +categoryId;
        const result = await client.post.findMany({
            where : { category_id : id }
        })
        return result;

    },

    /**
     * @param post
     * @returns {Promise<*>}
     */
    async insertPost(post) {
        const result = await client.post.create({ data: post })
        return result
    },

    /**
     * @param post
     * @returns {Promise<*>}
     */
    async editPost(postId, post) {
        const id = +postId;
        const result = await client.post.update({
            where: { id },
            data: post
        })
        return result
    },


    async deleteById(postId) {
        const id = +postId;
        const result = await client.post.delete({
            where: { id }
        })
        return result
    }
};