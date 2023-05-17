var express = require('express');
var router = express.Router();

const cartController = require('../../component/cart/CartController')


//http://localhost:3000/cart/api/getAllCart
router.get('/getAllCart', async (req, res, next) => {
    try {
        const carts = await cartController.getAllCart()
        console.log(carts)
        if (carts) {
            return res.status(200)
                .json({ message: "Get All Success", result: true, carts: carts, });
        } else {
            return res.status(400)
                .json({ result: false, carts: null, message: "Get All Failed" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ result: false, message: 'Error System' })
    }
})

//http://localhost:3000/cart/api/add-to-cart
router.post('/add-to-cart', async (req, res, next) => {
    try {
        const { userId, productId, quantity } = req.body;
        console.log("userId, productId, quantity",userId, productId, quantity)

        const carts = await cartController.addToCart(userId, productId, quantity)
        console.log("carts",carts)
        if (carts) {
            return res.status(200)
                .json({ message: "Add to cart Success", result: true, carts: carts, });
        } else {
            return res.status(400)
                .json({ result: false, carts: null, message: "Add to cartFailed" });
        }
    } catch (error) {
      
        return res.status(500).json({ result: false, message: 'Error System' })
    }
})












module.exports = router;