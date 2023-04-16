var express = require('express');
var router = express.Router();
const productController = require('../../component/product/ProductController')
const upLoadImage = require('../../MiddleWare/UpLoadImage')
const CONFIG = require('../../MiddleWare/Config')


// http://localhost:3000/product/cpanel/
//danh sách sản phẩm
router.get('/', async function(req, res, next) {
    const products = await productController.getAllProduct()
    res.render('product/table', {products})
})



// http://localhost:3000/product/cpanel/new 
// trang thêm mới
router.get('/new',   async function(req, res, next) {
    res.render('product/new')
})

//xử lí thêm mới sản phẩm
router.post('/new', [upLoadImage.single('image'),],  async function(req, res, next) {
    try {
        let {body, file} = req;
        console.log()
        if (file) {
            let image = `${CONFIG.CONSTANTS.IP}/images/${file.filename}`
            // let image = `http://192.168.1.6:3000/images/${file.filename}`
            body = {...body, image: image}
        }
        // image = 'https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg'
        let {name, price, quantity, image, type} = body;
        console.log('=>> ',name, price, quantity, image, type)
        await productController.addNewProduct(name, price, quantity, image,type)
        return res.redirect('http://localhost:3000/product/cpanel/')
    } catch (error) {
        console.log(error)
    }
})

// http://localhost:3000/product/cpanel/:id/delete
//xử lí xóa sản phẩm
router.get('/:id/delete',  async function(req, res, next) {
    const {id} = req.params;
    try {
        
        await productController.deleteProduct(id)
        return res.json({status: true, id: id})
    } catch (error) {
        console.log(error)
        return res.json({status: false, error: id})
    }
    
})


// http://localhost:3000/product/cpanel/:id/edit 
// hiển thị trang cập nhật sản phẩm
router.get('/:id/edit',  async function(req, res, next) {
    try {
        const {id} = req.params;
        const product = await productController.getProduct(id)

        res.render('product/edit', {product})
    } catch (error) {
        console.log(error)
    }
    
})

// http://localhost:3000/product/cpanel/:id/edit 
// xử lí edit sản phẩm
router.post('/:id/edit', [upLoadImage.single('image'), ],  async function(req, res, next) {
    try {
        let {id} = req.params
        
        let {body, file} = req;
        if (file) {
            let image = `${CONFIG.CONSTANTS.IP}/images/${file.filename}`
            // let image = 'https://172.16.87.74:3000/images/${file.filedname}'
            body = {...body, image: image}
        }
        // image = 'https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg'

        let {name, price, quantity, image} = body;
        console.log('=>> ',name, price, quantity, image, type)
        await productController.updateProduct(id, name, price, quantity, image, type)
        return res.redirect('/product/cpanel')
    } catch (error) {
        console.log(error)
    }
})


// http://localhost:3000/product/cpanel/search 
// xử lí search
router.post('/search', async function (req, res, next) { 
    try {
        const {keyword} = req.body
        const products = await productController.search(keyword);
        console.log('=>> ',products)
        console.log('=>> ',CONFIG.CONSTANTS.IP)
        // res.redirect('/cpanel/product');
        res.render('product/table', {products})
    } catch (error) {
        res.status(400).json({});
    }
})


module.exports = router;