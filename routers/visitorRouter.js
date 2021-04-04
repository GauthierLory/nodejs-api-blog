const express = require('express');
const router = express.Router();
const validationMiddlewares = require('../validation/validationMiddlewares')
const visitorSchema = require('../validation/visitorSchema');
const visitorsController = require('../controllers/visitorsController')

router.get('/', visitorsController.listVisitors);
router.get('/:visitorId(\\d+)', visitorsController.visitorById);
router.post('/', validationMiddlewares.validateBody(visitorSchema), visitorsController.createVisitor);

module.exports = router;