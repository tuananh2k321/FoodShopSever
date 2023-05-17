const CartModel = require('../../component/cart/CartModel');
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
        let cart = await cartModel.findOne({ userId: userId });
        console.log("cart", cart)
        if (cart) {
            //nếu tìm thấy user đã có giỏ hàng r thì thêm vào
            const product = await myProductModel.findById(productId);
            console.log("product", product)
           
            if (product) {
                const cartItem = await cartModel.findOne({ 'items.productId': productId });

                console.log("cartItem",cartItem)
                if (cartItem) {
                    // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng sản phẩm
                    await cartModel.findOneAndUpdate(
                        { 'items.productId': productId },
                        { $set: { 'items.$.quantity': quantity } }
                      );
                    return true

                } else {
                    //Nếu chưa có sản phẩm trong giỏ hàng thì thêm sản phẩm đó
                    await CartModel.updateOne(
                        { userId: userId },
                        { $push: { items: { productId: productId, quantity: quantity } } }
                      );
                    return true
                }
            } else {
                return false;
            }
        } else {
            //Nếu user chưa tồn tại trong Cart Model thì thêm mới user và sản phẩm
            const cart = new cartModel({
                userId: userId,
                items: [
                    {
                        productId: productId,
                        quantity: quantity,
                    }
                ]
            });
            await cart.save();
            return true
        }
    } catch (error) {
        console.log("EROR"+error)
        throw error;
    }
}







module.exports = {
    getAllCart, addToCart
};