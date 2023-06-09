const productService = require("./ProductService");

const getAllProduct = async () => {
  try {
    return await productService.getAllProduct();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllProductFruit = async () => {
  try {
    return await productService.getAllProductFruit();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllProductMeat = async () => {
  try {
    return await productService.getAllProductMeat();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllProductFish = async () => {
  try {
    return await productService.getAllProductFish();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllProductVegetable = async () => {
  try {
    return await productService.getAllProductVegetable();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    return await productService.deleteProduct(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addNewProduct = async (name, price, quantity, image, type ) => {
  try {
    console.log('Add params: ',name, price, quantity, image, type )
    await productService.addNewProduct(name, price, quantity, image, type);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateProduct = async (id, name, price, quantity, image ) => {
  try {
    console.log('params updateProduct: ', id, name, price, quantity, image )
    return await productService.updateProduct(id, name, price, quantity, image );
  } catch (error) {
    console.log('update product error', error);
    throw error;
  }
};

const getProduct = async (id) => {
  try {
    console.log('params getProduct: ', id)
    return await productService.getProduct(id);
  } catch (error) {
    console.log('get product error', error);
    throw error;
  }
};

const search = async (keyword) => {
  try {
    return await productService.search(keyword);
  } catch (error) {
    console.log('search product error', error);
    throw error;
  }
};



module.exports = { getAllProduct, deleteProduct, addNewProduct, 
                  updateProduct, getProduct, search, getAllProductFruit, getAllProductFish, getAllProductMeat, getAllProductVegetable };
