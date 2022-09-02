const express = require('express');
const validationMiddlewares = require('../validation/validationMiddlewares')
const postSchema = require('../validation/postSchema');
const router = express.Router();
const postsController = require('../controllers/postsController')

/** 
 * @swagger
 * tags:
 *  name: Post
 *  description: The Post managing api
 * 
 * components:
 *  schemas:
 *      Post:
 *          type: object
 *          required:
 *              - slug
 *              - title
 *              - excerpt
 *              - content
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the Post
 *              slug:
 *                  type: string
 *                  description: The slug of the Post
 *              title:
 *                  type: string
 *                  description: The title of the Post
 *              excerpt:
 *                  type: string
 *                  description: The excerpt of the Post
 *              content:
 *                  type: string
 *                  description: The content of the Post
 *              category_id:
 *                  type: int
 *                  description: The category of the post
 *          example:
 *              id: 5
 *              title: this is the title
 *              slug: this-is-the-title
 *              excerpt: Lorem ipsum dolor sit amet
 *              content: Lorem ipsum dolor sit amet
 *              category_id: 2
 */

/** 
 * @swagger
 * /posts:
 *      get:
 *          summary: Returns the list of all the posts
 *          tags: [Post]
 *          responses:
 *              200:
 *                  description: The list of the posts
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Post'
 *              204:
 *                  description: No content
 *              500:
 *                  description: Some error happened
 */
router.get('/', postsController.listPosts);

/** 
 * @swagger
 * /posts/{postId}:
 *      get:
 *          summary: Get the post by id
 *          tags: [Post]
 *          parameters:
 *              - in: path
 *                name: postId
 *                schema:
 *                  type: string
 *                required: true
 *                description: The post id
 *          responses:
 *              200:
 *                  description: The post description by id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Post'
 *              404:
 *                  description: The post was not found
 *              500:
 *                  description: Some error happened
 */
router.get('/:postId(\\d+)', postsController.postById);

/** 
 * @swagger
 * /category/{categoryId}:
 *      get:
 *          summary: Get the list of post by category id
 *          tags: [Post]
 *          parameters:
 *              - in: path
 *                name: categoryId
 *                schema:
 *                  type: string
 *                required: true
 *                description: The post id
 *          responses:
 *              200:
 *                  description: The post description by category id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Post'
 *              404:
 *                  description: The post was not found
 *              500:
 *                  description: Some error happened
 */
router.get('/category/:categoryId(\\d+)', postsController.postByCategoryId);

/** 
 * @swagger
 * /posts:
 *      post:
 *          summary: Create a new post
 *          tags: [Post]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *          responses:
 *              201:
 *                  description: The post was successfully created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Post'
 *              404:
 *                  description: The post was not found
 *              500:
 *                  description: Some error happened
 */
router.post('/', validationMiddlewares.validateBody(postSchema), postsController.createPost);

/** 
 * @swagger
 * /posts/{postId}:
 *      put:
 *          summary: Update a post
 *          tags: [Post]
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
 *                          $ref: '#/components/schemas/Post'
 *          responses:
 *              200:
 *                  description: The post was successfully updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Post'
 *              404:
 *                  description: The post was not found
 *              500:
 *                  description: Some error happened
 */
router.put('/:postId(\\d+)', validationMiddlewares.validateBody(postSchema), postsController.editPost);

/** 
 * @swagger
 * /posts/{postId}:
 *      delete:
 *          summary: Remove the post by id
 *          tags: [Post]
 *          parameters:
 *              - in: path
 *                name: postId
 *                schema:
 *                  type: string
 *                required: true
 *                description: The post id
 *          responses:
 *              204:
 *                  description: The post was successfully deleted
 *              404:
 *                  description: The comment was not found
 */
router.delete('/:postId(\\d+)', postsController.deleteById);

module.exports = router;