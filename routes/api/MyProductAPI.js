var express = require('express');
var router = express.Router();

const myProductController = require('../../component/myProduct/MyProductController')
const upLoadImage = require("../../MiddleWare/UpLoadImage")

//http://localhost:3000/myProduct/api/getAllProduct
router.get('/getAllProduct', async (req, res, next) => {
    try {
        const products = await myProductController.getAllProduct()
        console.log(products)
        if (products) {
            return res.status(200).json({ message: "Get All Success", result: true, products: products, });
        } else {
            return res.status(400).json({ result: false, products: null, message: "Get All Failed" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ result: false, message: 'Error System' })
    }
})

//http://localhost:3000/myProduct/api/add-new
router.post('/add-new', [upLoadImage.single('image')], async (req, res, next) => {
    try {
        let { body, file } = req;

        if (file) {
            file = `http://10.0.2.2:3000/images/${file.filename}`;
            body = { ...body, image: file };
        }

        const { name, price, category, description, image, stock, mfg, exp } = body;
        console.log("name", name, "price", price, category, description, image, stock, mfg, exp)
        const product = await myProductController.addNew(name, price, category, description, image, stock, mfg, exp)
        console.log(product)

        if (product) {
            return res.status(200).json({ result: true, product: product, message: "Add new Success" });
        } else {
            return res.status(400).json({ result: false, product: null, token: null, message: "Add new  Failed" });
        }
    } catch (error) {
        //console.log(error)
        res.status(500).json({ result: null, message: "ERROR SYSTEM" })
    }
})

//http://localhost:3000/myProduct/api/delete
router.delete('/delete', async (req, res, next) => {
    try {
        let { name } = req.body;
        const product = await myProductController.deleteByName(name);
        if (product) {
            res.status(200).json({ result: true, message: 'Delete Success' })
        } else {
            res.status(400).json({ result: false, message: "Failed to Delete" })
        }
    } catch (error) {
        res.status(500).json({ result: null, message: 'ERROR SYS' })
    }
})

//http://localhost:3000/myProduct/api/update-by-id
router.put('/update-by-id', [upLoadImage.single('image')], async (req, res, next) => {
    try {
        const { _id } = req.query;
        const { name, price, category, description, image, stock, mfg, exp } = req.body;

        const product = await myProductController
            .updateProductById(_id, name, price, category, description, image, stock, mfg, exp);
        console.log(product)
        if (product) {
            return res.status(200).json({ result: true, product: product, massage: "Update success" });
        } else {
            return res.status(400).json({ result: false, product: null, massage: "Update Failed" });
        }
    } catch (error) {
        res.status(500).json({ result: null, message: 'ERROR SYS' })
    }
})
//http://localhost:3000/myProduct/api/search
router.get('/search', async (req, res, next) => {
    try {
        let { name } = req.query;
        const products = await myProductController.searchProduct(name);
        console.log("products", products)
        if (products) {
            return res.status(200).json({ massage: "Search Success", result: true, product: products, })
        } else {
            return res.status(400).json({ massage: "Search Failed", result: false, product: null, })
        }
    } catch (error) {
        return res.status(500).json({ result: false, product: null })
    }
})


module.exports = router;