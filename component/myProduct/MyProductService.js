const myProductModel = require('../../component/myProduct/MyProductModel');

const getAllProduct = async (page, size) => {
    try {
        return await myProductModel.find();
    } catch (error) {
        console.log("List product Got an error: ", error);
        throw error;
    }
}

const addNew = async (name, price, category, description, image, stock, mfg, exp) => {
    try {
        console.log("=>", name, price, category, description, image, stock, mfg, exp);
        const product = await myProductModel.findOne({ name: name })
        if (product) {
            return false;
        } else {
            const newProduct = { name, price, category, description, image, stock, mfg, exp }
            const p = new myProductModel(newProduct);
            await p.save();
            return true;
        }
    } catch (error) {
        console.log("New product Got an error: ", error);
        throw error;
    }
}
const deleteByName = async (name) => {
    try {
        const product = await myProductModel.findOneAndDelete({ name: name });

        return true;
    } catch (error) {
        console.log("Error for delete");
        throw error;
    }
}
const searchProduct = async (name) => {
    try {
        return await myProductModel.find({
            name
            // $and: [
            //     { name: { $regex: name, $options: 'i' } },

            // ]
        }).sort({ stock: -1, price: 1 });

    } catch (error) {
        return false;
    }
}
const updateProductById = async (_id, name, price, category, description, image, stock, mfg, exp) => {
    try {
        const product = await myProductModel.findOne({ _id })
        console.log("product", product)
        if (product == null) {
            return false;

        } else {
            console.log("BBBBBBB")
            product.name = name ? name : product.name;
            product.price = price ? price : product.price;
            product.category = category ? category : product.category;

            product.description = description ? description : product.description;
            product.image = image ? image : product.image;

            product.stock = stock ? stock : product.stock;
            product.mfg = mfg ? mfg : product.mfg;
            product.exp = exp ? exp : product.exp;
            console.log("BBBBBBB")

            await product.save();
            console.log("INFO product:", product);
            return true;
        }

    } catch (error) {
        return false;
    }
}
const getById = async (_id) => {
    try {
        return await myProductModel.findOne({_id});
    } catch (error) {
        return false;
    }
}
module.exports = {
    getAllProduct, addNew, deleteByName,
    searchProduct, updateProductById, getById
};
