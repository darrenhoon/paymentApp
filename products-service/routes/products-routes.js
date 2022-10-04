const express = require('express');
const productsController = require('../controllers/products-controller');
// const checkAuth = require('../middleware/auth');

const router = express.Router();

router.get('/products', productsController.getProducts);

module.exports = router;
