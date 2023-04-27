const cartService = require('../../component/cart/CartService')


const getAllCart = async (page, size) => {
    try {
        return await cartService.getAllCart(page, size);
    } catch (error) {
        throw error;
    }
}
const addToCart = async (userId, productId, quantity) => {
    try {
        return await cartService
            .addToCart(userId, productId, quantity);
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getAllCart,addToCart
};