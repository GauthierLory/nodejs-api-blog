const postDataMapper = require('../dataMappers/postDataMapper');
const categoryDataMapper = require('../dataMappers/categoryDataMapper');
const commentDataMapper = require("../dataMappers/commentDataMapper");

module.exports = {

    /**
     * Récupère l'ensemble des posts
     * @param _
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async listPosts(_, response) {
        try {
            const posts = await postDataMapper.findAllPosts();
            if (posts) {
                response.json({ data: posts });
            } else {
                response.status(404).json({ error: "Posts not found" });
            }
        } catch(error) {
            next(error);
        }
    },

    /**
     * Récupère le post par son id
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async postById(request, response, next) {
        try {
            const { postId } = request.params;
            const post = await postDataMapper.findPostById(postId);
            if (post) {
                response.json({ data: post });
            } else {
                response.status(404).json({ error: "Post not found" });
            }
        } catch(error) {
            next(error);
        }
    },

    /**
     * Récupère la liste des posts par l'id de la category
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async postByCategoryId(request, response, next) {
        try {
            const { categoryId } = request.params;
            const category = await categoryDataMapper.findCategoryById(categoryId);
            if (category) {
                const posts = await postDataMapper.findPostsByCategoryId(categoryId);
                response.json({ data: posts });
            } else {
                response.status(404).json({ error: 'Posts not found' });
            }
        } catch(error) {
            next(error);
        }
    },

    /**
     * Permet la création d'un post
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async createPost(request, response, next) {
        try {
            const postData = request.body;
            const post = await postDataMapper.insertPost(postData);
            response.status(201).json({ data: post });
        } catch(error) {
            next(error);
        }
    },

    /**
     * Récupère le post par son id pour le modifier
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async editPost(request, response, next) {
        try {
            const { postId } = request.params;
            const post = await postDataMapper.findPostById(postId);

            if (post) {
                const postData = request.body;
                const post = await postDataMapper.editPost(postId, postData);
                response.status(201).json({ data: post });
            } else {
                response.status(404).json({ error: "Post not found" });
            }
        } catch(error) {
            next(error);
        }
    },

    /**
     * Permet la suppression d'un post avec ses commentaires
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async deleteById(request, response, next){
        try {
            const { postId } = request.params;
            const postExist = await postDataMapper.findPostById(postId);

            if (postExist) {
                const comments = await commentDataMapper.findCommentsByPostId(postId);
                comments.forEach( comment => {
                    commentDataMapper.deleteById(comment.id);
                })
                await postDataMapper.deleteById(postId);
                response.status(200).json({ message: 'Deleted' });
            } else {
                response.status(404).json({ message: 'Post not found' });
            }
        } catch(error) {
            next(error);
        }
    }
}