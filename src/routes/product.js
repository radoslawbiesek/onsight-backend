const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

router.get('/products/', productController.getProducts);

router.get('/products/:productId', productController.getProduct);

router.post('/products/', productController.createProduct);

router.get('/filters/', productController.getFilters);

module.exports = router;
