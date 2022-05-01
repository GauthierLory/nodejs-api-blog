const express = require('express');
const validationMiddlewares = require('../validation/validationMiddlewares')
const postSchema = require('../validation/postSchema');
const router = express.Router();
const postsController = require('../controllers/postsController')

router.get('/', postsController.listPosts);
router.get('/:postId(\\d+)', postsController.postById);
router.get('/:postId(\\d+)/comment', postsController.commentByPostId);
router.post('/:postId(\\d+)', postsController.createComment)
router.get('/category/:categoryId(\\d+)', postsController.postByCategoryId);
router.post('/', validationMiddlewares.validateBody(postSchema), postsController.createPost);
router.put('/:postId(\\d+)', validationMiddlewares.validateBody(postSchema), postsController.editPost);

module.exports = router;