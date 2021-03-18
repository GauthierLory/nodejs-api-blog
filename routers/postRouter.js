const express = require('express');

const postsController = require('../controllers/postsController');

const router = express.Router();

router.get('/', postsController.listPosts);
router.get('/:postId', postsController.postById);
router.get('/category/:categoryId', postsController.postByCategoryId);
router.post('/', postsController.createPost);

module.exports = router;