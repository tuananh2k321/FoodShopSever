const categoryService = require('./CategoryService');

const getCategories = async () => {
    try {
        return await categoryService.getAllCategory();
    } catch (e) {
        console.log(e)
        throw error;
    }
}
const addNewCategory = async (name)=>{
    try {
        return await categoryService.addNewCategory(name);
    } catch (error) {
        console.log(error)
        return false;
    }
}
const deleteCategoryByName = async (name)=>{
    try {
        return await categoryService.deleteCategoryByName(name);
    } catch (error) {
        console.log(error)
        return false;
    }
}
const updateCategoryByName = async (nameUpdate,name)=>{
    try {
        return await categoryService.updateCategoryByName(nameUpdate,name);
    } catch (error) {
        console.log(error)
        return false;
    }
}
module.exports = { getCategories ,addNewCategory,deleteCategoryByName,updateCategoryByName}