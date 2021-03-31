const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController')

router.get('/', postsController.listPosts);
router.get('/:postId(\\d+)', postsController.postById);
router.get('/category/:categoryId(\\d+)', postsController.postByCategoryId);
router.post('/', postsController.createPost);

module.exports = router;