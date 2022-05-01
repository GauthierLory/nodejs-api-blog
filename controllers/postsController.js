const postDataMapper = require('../dataMappers/postDataMapper');
const categoryDataMapper = require('../dataMappers/categoryDataMapper');

module.exports = {

    /**
     * Récupère l'ensemble des posts
     * @param {*} _ 
     * @param {*} response 
     */
    async listPosts(_, response) {
        const posts = await postDataMapper.findAllPosts();
        response.json({ data: posts });
    },

    /**
     * Récupère le post par son id
     * @param {*} request 
     * @param {*} response 
     */
    async postById(request, response) {
        const { postId } = request.params;
        const post = await postDataMapper.findPostById(postId);

        // Si post vaut null ou undefined
        if (!post) {
            response.status(404).json({ error: "Not found" });
        } else {
            response.json({ data: post });
        }

    },

    /**
     * Récupère la liste des posts par l'id de la category
     * @param {*} request 
     * @param {*} response 
     */
    async postByCategoryId(request, response) {

        const { categoryId } = request.params;
        const posts = await postDataMapper.findPostsByCategoryId(categoryId);

        if (!posts.length) {
            response.status(404).json({ error: 'not found' });
        } else {
            response.json({ data: posts });
        }

    },

    /**
     * Permet la création d'un post
     * @param {*} request 
     * @param {*} response 
     */
    async createPost(request, response) {
        const postData = request.body;
        const post = await postDataMapper.insertPost(postData);
        response.status(201).json({ data: post });
    },

    /**
     * Récupère le post par son id pour le modifier
     * @param {*} request
     * @param {*} response
     */
    async editPost(request, response) {
        const { postId } = request.params;
        const post = await postDataMapper.findPostById(postId);

        if (!post) {
            response.status(404).json({ error: "Not found" });
        } else {
            const postData = request.body;
            const post = await postDataMapper.editPost(postId, postData);
            response.status(201).json({ data: post });
        }

    },

    /**
     * Permet la création d'un commentaire sur un post
     * @param {*} request
     * @param {*} response
     */
    async createComment(request, response){
        const commentData = request.body;
        const comment = await postDataMapper.insertComment(commentData);
        response.status(201).json({ data: comment })
    },

    /**
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    async commentByPostId(request, response){
        const { postId } = request.params;
        const comment = await postDataMapper.findCommentByPost(postId);

         if (!comment) {
            response.status(404).json({ error: "Not found" });
        } else {
            response.json({ data: comment });
        }
    }
}