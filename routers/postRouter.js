const express = require('express');
const validationMiddlewares = require('../validation/validationMiddlewares')
const postSchema = require('../validation/postSchema');
const router = express.Router();
const postsController = require('../controllers/postsController')

router.get('/', postsController.listPosts);
router.get('/:postId(\\d+)', postsController.postById);
router.get('/category/:categoryId(\\d+)', postsController.postByCategoryId);
router.post('/', validationMiddlewares.validateBody(postSchema), postsController.createPost);
router.put('/:postId(\\d+)', validationMiddlewares.validateBody(postSchema), postsController.editPost);
router.delete('/:postId(\\d+)', postsController.deleteById);

module.exports = router;