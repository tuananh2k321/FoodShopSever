var express = require('express');
var router = express.Router();
var productController = require('../../component/product/ProductController')
// http://localhost:3000/product/api/getAll
// lấy ra tất cả sản phẩm
router.get('/getAll', async function(req, res, next) {
    try {
        const products = await productController.getAllProduct()
        return res.status(200).json({products: products, result: true})
    } catch (error) {
        res.status(500).json({error: error, result: false})
    }
    
})

// http://localhost:3000/product/api/fruit
// lấy ra tất cả sản phẩm fruit
router.get('/fruit', async function(req, res, next) {
    try {
        const products = await productController.getAllProductFruit()
        return res.status(200).json({products: products, result: true})
    } catch (error) {
        res.status(500).json({error: error, result: false})
    }  
})

// http://localhost:3000/product/api/meat
// lấy ra tất cả sản phẩm meat
router.get('/meat', async function(req, res, next) {
    try {
        const products = await productController.getAllProductMeat()
        return res.status(200).json({products: products, result: true})
    } catch (error) {
        res.status(500).json({error: error, result: false})
    }  
})

// http://localhost:3000/product/api/fish
// lấy ra tất cả sản phẩm fish
router.get('/fish', async function(req, res, next) {
    try {
        const products = await productController.getAllProductFish()
        return res.status(200).json({products: products, result: true})
    } catch (error) {
        res.status(500).json({error: error, result: false})
    }  
})

// http://localhost:3000/product/api/vegetable
// lấy ra tất cả sản phẩm vegetable
router.get('/vegetable', async function(req, res, next) {
    try {
        const products = await productController.getAllProductVegetable()
        return res.status(200).json({products: products, result: true})
    } catch (error) {
        res.status(500).json({error: error, result: false})
    }  
})
module.exports = router;