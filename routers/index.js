const express = require('express');
const router = express.Router();

const categoryRouter = require('./categoryRouter');
const postRouter = require('./postRouter');
const visitorRouter = require('./visitorRouter')
const commentRouter = require('./commentRouter')
const errorsMiddlewares = require('../validation/errorsMiddlewares');


router.use('/categories', categoryRouter);
router.use('/posts', postRouter);
router.use('/visitors', visitorRouter);
router.use('/comments', commentRouter);

router.use(errorsMiddlewares.error404);
router.use(errorsMiddlewares.error500);

module.exports = router;