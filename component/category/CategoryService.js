const CategoryModel = require('./CategoryModel');
const getAllCategory = async () => {
    try {
        return await CategoryModel.find();
    } catch (error) {
        throw (console.log(error));
    }
}

const addNewCategory = async (name) => {
    try {
        const category = await CategoryModel.findOne({ name: name });

        if (category) {
            return false;
        } else {
            const newCategory = { name }
            const p = new CategoryModel(newCategory);
            await p.save();
            return true;
        }
    } catch (error) {
        console.log("EROOR add new" + error);
        return false
    }
}

const deleteCategoryByName = async (name) => {
    try {
        const category = await CategoryModel.findOne({ name: name })
        console.log(category)
        {
            await CategoryModel.deleteOne(category)
        }
        return true;
    } catch (error) {
        console.log("Delete category error" + error);
        return false;

    }
}

const updateCategoryByName = async (nameUpdate, name) => {
    try {
        console.log(nameUpdate,name)
        const category = await CategoryModel.findOne({ name: nameUpdate })
        if (category) {
            category.name = name ? name : category.name;
            await category.save();
            console.log("category:" + category);
            return true;
        } else {

            return false;
        }
    } catch (error) {
        console.log("Update category  error" + error)
        return false;

    }
}
module.exports = { getAllCategory, addNewCategory, deleteCategoryByName, updateCategoryByName }
