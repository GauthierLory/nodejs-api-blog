const express = require('express');
const router = express.Router();
const validationMiddlewares = require('../validation/validationMiddlewares')
const commentSchema = require('../validation/commentSchema');
const commentsController = require('../controllers/commentsController')

/** 
 * @swagger
 * tags:
 *  name: Comment
 *  description: The comment managing api
 * 
 * components:
 *  schemas:
 *      Comment:
 *          type: object
 *          required:
 *              - content
 *              - author_id
 *              - post_id
 *          properties:
 *              content:
 *                  type: string
 *                  description: The auto-generated id of the Comment
 *              author_id:
 *                  type: int
 *                  description: The id of the author
 *              post_id:
 *                  type: int
 *                  description: The id of the post
 *          example:
 *              content: "Post on specific topic"
 *              author_id: 2
 *              post_id: 1
 */

/** 
 * @swagger
 * /comments:
 *      get:
 *          summary: Returns the list of all the comments
 *          tags: [Comment]
 *          responses:
 *              200:
 *                  description: The list of the comments
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Comment'
 *              500:
 *                  description: Some error happened
 */
router.get('/', commentsController.listComments);

/** 
 * @swagger
 * /comments/posts/{postId}:
 *      get:
 *          summary: Get the list of comment by post id
 *          tags: [Comment]
 *          parameters:
 *              - in: path
 *                name: postId
 *                schema:
 *                  type: string
 *                required: true
 *                description: The post id
 *          responses:
 *              200:
 *                  description: The comment description by post id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Comment'
 *              404:
 *                  description: The post was not found
 *              500:
 *                  description: Some error happened
 */
router.get('/posts/:postId(\\d+)', commentsController.commentsByPostId);

/** 
 * @swagger
 * /comments/{commentId}:
 *      get:
 *          summary: Get the comment by id
 *          tags: [Comment]
 *          parameters:
 *              - in: path
 *                name: commentId
 *                schema:
 *                  type: string
 *                required: true
 *                description: The comment id
 *          responses:
 *              200:
 *                  description: The comment description by id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Comment'
 *              404:
 *                  description: The comment was not found
 *              500:
 *                  description: Some error happened
 */
router.get('/:commentId(\\d+)', commentsController.commentById);

/** 
 * @swagger
 * /comments/{postId}:
 *      post:
 *          summary: Create a new comment
 *          tags: [Comment]
 *          parameters:
 *              - in: path
 *                name: postId
 *                schema:
 *                  type: string
 *                required: true
 *                description: The post id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comment'
 *          responses:
 *              201:
 *                  description: The comment was successfully created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Comment'
 *              404:
 *                  description: The comment was not found
 *              500:
 *                  description: Some error happened
 */
router.post('/:postId(\\d+)', validationMiddlewares.validateBody(commentSchema), commentsController.createComment);

/** 
 * @swagger
 * /comments/{commentId}:
 *      put:
 *          summary: Update a comment
 *          tags: [Comment]
 *          parameters:
 *              - in: path
 *                name: commentId
 *                schema:
 *                  type: string
 *                required: true
 *                description: The comment id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comment'
 *          responses:
 *              200:
 *                  description: The comment was successfully updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Comment'
 *              404:
 *                  description: The comment was not found
 *              500:
 *                  description: Some error happened
 */
router.put('/:commentId(\\d+)', validationMiddlewares.validateBody(commentSchema), commentsController.editComment);

/** 
 * @swagger
 * /comments/{commentId}:
 *      delete:
 *          summary: Remove the comment by id
 *          tags: [Comment]
 *          parameters:
 *              - in: path
 *                name: commentId
 *                schema:
 *                  type: string
 *                required: true
 *                description: The comment id
 *          responses:
 *              200:
 *                  description: The comment was successfully deleted
 *              404:
 *                  description: The comment was not found
 *              500:
 *                  description: Some error happened
 */
router.delete('/:commentId(\\d+)', commentsController.deleteById);

module.exports = router;