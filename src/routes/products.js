const express = require('express')

const router = express.Router()

const productsController = require('../controllers/products')

// CREATE -> post : localhost:4000/v1/customer/product
router.post('/product', productsController.createProduct)

// READ -> get : localhost:4000/v1/customer/products
router.get('/products', productsController.getAllProducts)

module.exports = router