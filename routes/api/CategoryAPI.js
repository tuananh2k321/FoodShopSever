var express = require('express');
var router = express.Router();
const { checkTokenApp } = require('../../MiddleWare/Authen')
const categoryController = require('../../component/category/CategoryController');

//http://localhost:3000/category/api/get-all-category
router.get('/get-all-category', async (req, res, next) => {
    try {
        const categories = await categoryController.getCategories();
        console.log(categories)
        return res.status(200).json({ result: true, categories: categories });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ result: false, categories: null })
    }
})
//http://localhost:3000/category/api/add-new
router.post('/add-new', [], async (req, res, next) => {
    try {
        const { name } = req.body;
        console.log(name)

        const categories =await categoryController.addNewCategory(name);
        console.log(categories)
        if (categories) {
            return res.status(200).json({ result: true, categories: categories, massage: "Add new success" });

        } else {
            return res.status(400).json({ result: false, categories: categories, massage: "Failed to add new" });

        }
        
    } catch (error) {
        console.log("Error get all category " + error);
        return res.status(500).json({ result: false, categories: null })
    }
})

//http://localhost:3000/category/api/delete-by-name
router.delete('/delete-by-name', [], async (req, res, next) => {
    try {
        const { name } = req.body;
        console.log(name)

        const categories =await categoryController.deleteCategoryByName(name);
        console.log(categories)
        if (categories) {
            return res.status(200).json({ result: true, categories: categories, massage: "Delete category success" });

        } else {
            return res.status(400).json({ result: false, categories: categories, massage: "Failed to Delete category" });

        }
        
    } catch (error) {
        console.log("Error get all category " + error);
        return res.status(500).json({ result: false, categories: null })
    }
})
//
router.put('/update-by-name', [], async (req, res, next) => {
    try {
        const { nameUpdate } = req.query;
        const { name } = req.body;
        console.log(name)

        const categories =await categoryController.updateCategoryByName(nameUpdate,name);
        console.log(categories)
        if (categories) {
            return res.status(200).json({ result: true, categories: categories, massage: "Update category success" });

        } else {
            return res.status(400).json({ result: false, categories: categories, massage: "Failed to Update category" });

        }
        
    } catch (error) {
        console.log("Error get all category " + error);
        return res.status(500).json({ result: false, categories: null })
    }
})
















module.exports = router;