const express = require('express');

const categoryRouter = require('./categoryRouter');
const postRouter = require('./postRouter');
const visitorRouter = require('./visitorRouter')

const router = express.Router();

router.use('/categories', categoryRouter);
router.use('/posts', postRouter);
router.use('/visitors', visitorRouter);

module.exports = router;