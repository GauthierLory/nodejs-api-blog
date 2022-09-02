const express = require('express');
const router = express.Router();
const validationMiddlewares = require('../validation/validationMiddlewares')
const commentSchema = require('../validation/commentSchema');
const commentsController = require('../controllers/commentsController')

router.get('/', commentsController.listComments);
router.get('/posts/:postId(\\d+)', commentsController.commentsByPostId);
router.get('/:commentId(\\d+)', commentsController.commentById);
router.post('/:postId(\\d+)', validationMiddlewares.validateBody(commentSchema), commentsController.createComment);
router.put('/:commentId(\\d+)', validationMiddlewares.validateBody(commentSchema), commentsController.editComment);
router.delete('/:commentId(\\d+)', commentsController.deleteById);

module.exports = router;