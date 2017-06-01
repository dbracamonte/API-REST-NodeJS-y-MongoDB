'use strict'

const express = require('express')
const api = express.Router()
const productCtrl = require('../controllers/product')

api.get('/product', productCtrl.getProducts)
api.get('/product/:productID', productCtrl.getProduct)
api.post('/product', productCtrl.saveProduct)
api.put('/product/:productID', productCtrl.updateProduct)
api.delete('/product/:productID', productCtrl.deleteProduct)

module.exports = api