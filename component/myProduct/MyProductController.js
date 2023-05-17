const myProductService = require('../../component/myProduct/MyProductService')


const getAllProduct = async (page, size) => {
    try {
        return await myProductService.getAllProduct(page, size);
    } catch (error) {
        throw error;
    }
}

const addNew = async (name, price, category, description, image, stock, mfg, exp) => {
    try {
        return await myProductService
            .addNew(name, price, category, description, image, stock, mfg, exp);
    } catch (error) {
        throw error;
    }
}
const deleteByName = async (name) => {
    try {
        return await myProductService.deleteByName(name)
    } catch (error) {
        throw error
    }
}
const searchProduct = async (name) => {
    try {
        return await myProductService.searchProduct(name);

    } catch (error) {
        return false;
    }
}
const updateProductById = async (_id, name, price, category, description, image, stock, mfg, exp) => {
    try {
        return await myProductService.updateProductById(_id, name, price, category, description, image, stock, mfg, exp);

    } catch (error) {
        return false;
    }
}
const getById = async (_id) => {
    try {
        return await myProductService.getById(_id);
    } catch (error) {
        return false;

    }
}
module.exports = {
    getAllProduct, addNew, deleteByName,
    searchProduct, updateProductById,getById
};