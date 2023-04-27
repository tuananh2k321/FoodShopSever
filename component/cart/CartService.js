const cartModel = require('../../component/cart/CartModel');
const myProductModel = require('../../component/myProduct/MyProductModel');


const getAllCart = async (page, size) => {
    try {
        return await cartModel.find();
    } catch (error) {
        console.log("List cart got an error: ", error);
        throw error;
    }
}
const addToCart = async (userId, productId, quantity) => {
    try {
        let cart = await cartModel.find({ userId: userId });
        console.log("cart", cart)
        if (cart) {
            const product = await myProductModel.findById(productId);
            console.log("product", product)

            if (product) {
                // const itemIndex = cart.items
                //     .findIndex(item => item.product.equals(productId));
                // console.log("itemIndex", itemIndex)

                // // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng sản phẩm
                // if (itemIndex !== -1) {
                //     cart.items[itemIndex].quantity += quantity;
                // } else {
                //     // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào giỏ hàng
                //     cart.items.push({ myProduct: productId, quantity });
                // }

                cart.items.push({ myProduct: productId, quantity });
                await cart.save();
            } else {
                return false;
            }
        } else {
            cart = new cartModel({ userId: userId, items: [] });
        }
    } catch (error) {
        console.log("List cart got an error: ", error);
        throw error;
    }
}







module.exports = {
    getAllCart, addToCart
};