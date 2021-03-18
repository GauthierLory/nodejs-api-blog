const express = require('express');

const categoryRouter = require('./categoryRouter');
const postRouter = require('./postRouter');

const router = express.Router();

router.use('/categories', categoryRouter);
router.use('/posts', postRouter);

module.exports = router;