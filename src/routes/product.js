const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

router.get('/products/', productController.getProducts);

router.get('/products/:productId', productController.getProduct);

router.post('/products/', productController.createProduct);

module.exports = router;
