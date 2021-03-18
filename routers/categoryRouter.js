const express = require('express');

const categoriesController = require('../controllers/categoriesController')

const router = express.Router();

router.get('/', categoriesController.listCategories);

module.exports = router;