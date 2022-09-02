const express = require('express');

const categoriesController = require('../controllers/categoriesController')

const router = express.Router();

/** 
 * @swagger
 * tags:
 *  name: Category
 *  description: The categories managing api
 * components:
 *  schemas:
 *      Category:
 *          type: object
 *          required:
 *              - label
 *              - route
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the category
 *              label:
 *                  type: string
 *                  description: The label of the category
 *              route:
 *                  type: string
 *                  description: The route of the category
 *          example:
 *              id: 5
 *              label: php
 *              route: php
 */

/** 
 * @swagger
 * /categories:
 *      get:
 *          summary: Returns the list of all the categories
 *          tags: [Category]
 *          responses:
 *              200:
 *                  description: The list of the categories
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Category'
 *              404:
 *                  description: The category was not found
 *              500:
 *                  description: Some error happened
 */
router.get('/', categoriesController.listCategories);

/** 
 * @swagger
 * /categories/{categoryId}:
 *      get:
 *          summary: Get the category by id
 *          tags: [Category]
 *          parameters:
 *              - in: path
 *                name: categoryId
 *                schema:
 *                  type: string
 *                required: true
 *                description: The category id
 *          responses:
 *              200:
 *                  description: The category description by id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Category'
 *              404:
 *                  description: The category was not found
 *              500:
 *                  description: Some error happened
 */
router.get('/:categoryId(\\d+)', categoriesController.categoryById);

module.exports = router;