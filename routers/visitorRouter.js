const express = require('express');
const router = express.Router();
const validationMiddlewares = require('../validation/validationMiddlewares')
const visitorSchema = require('../validation/visitorSchema');
const visitorsController = require('../controllers/visitorsController')


/** 
 * @swagger
 * tags:
 *  name: Visitor
 *  description: The visitors managing api
 * 
 * components:
 *  schemas:
 *      Visitor:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the visitor
 *              email:
 *                  type: string
 *                  description: The email of the visitor
 *              password:
 *                  type: string
 *                  description: The password of the visitor
 *          example:
 *              id: 5
 *              email: user1@mail.com
 *              password: password
 */

/** 
 * @swagger
 * /visitors:
 *      get:
 *          summary: Returns the list of all the visitors
 *          tags: [Visitor]
 *          responses:
 *              200:
 *                  description: The list of the visitors
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Visitor'
 *              500:
 *                  description: Some error happened
 */
router.get('/', visitorsController.listVisitors);

/** 
 * @swagger
 * /visitors/{visitorId}:
 *      get:
 *          summary: Get the visitor by id
 *          tags: [Visitor]
 *          parameters:
 *              - in: path
 *                name: visitorId
 *                schema:
 *                  type: string
 *                required: true
 *                description: The visitor id
 *          responses:
 *              200:
 *                  description: The visitor description by id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Visitor'
 *              404:
 *                  description: The visitor was not found
 *              500:
 *                  description: Some error happened
 */
router.get('/:visitorId(\\d+)', visitorsController.visitorById);


/** 
 * @swagger
 * /visitors:
 *      post:
 *          summary: Create a new visitor
 *          tags: [Visitor]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Visitor'
 *          responses:
 *              201:
 *                  description: The visitor was successfully created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Visitor'
 *              404:
 *                  description: The visitor was not found
 *              500:
 *                  description: Some error happened
 */
router.post('/', validationMiddlewares.validateBody(visitorSchema), visitorsController.createVisitor);

module.exports = router;