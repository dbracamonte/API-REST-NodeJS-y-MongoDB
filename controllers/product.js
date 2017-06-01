'use strict'

const Product = require('../models/product')

function saveProduct (req, res) {
    console.log('POST /api/products')
    console.log(req.body)
    
    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStored) => {
        if (err) {
            return res.status(500).send({ message: `Error al salvar en la base de datos. ${ err }` })
        }

        res.status(200).send({ product: productStored })
    })
}

function getProduct (req, res) {
    let productID = req.params.productID

    Product.findById(productID, (err, product) => {
        if (err) {
            return res.status(500).send({ message: `Error al realizar peticion. ${ err }` })
        }
        if (!product) {
            return res.status(404).send({ message: `El producto no existe` })
        }
        res.status(200).send({ product })
    })
}

function getProducts (req, res) {
    Product.find({}, (err, products) => {
        if (err) {
            return res.status(500).send({ message: `Error al realizar peticion. ${ err }` })
        }
        if (!products) {
            return res.status(404).send({ message: `No existes productos` })
        }
        res.status(200).send({ products })
    })
}

function updateProduct (req, res) {
    let productID = req.params.productID
    let body = req.body

    Product.findByIdAndUpdate(productID, body, (err, productUpdated) => {
        if (err) {
            return res.status(500).send({ message: `Error al actualizar el producto: ${ err }`})
        }
        res.status(200).send({ product: productUpdated })
    })
}

function deleteProduct (req, res) {
    let productID = req.params.productID

    Product.findById(productID, (err, product) => {
        if (err) {
            return res.status(500).send({ message: `Error al borrar el producto: ${ err }`})
        }

        product.remove( (err) => {
            if (err) {
                return res.status(500).send({ message: `Error al borrar el producto: ${ err }`})
            }
            res.status(200).send({ message: `El producto ha sido eliminado` })
        })
    })
}

module.exports = {
    saveProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}