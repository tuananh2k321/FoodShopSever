const productModel = require('../product/ProductModel')
const getAllProduct = async () => {
    try {
        // return data;
        return await productModel.find({})
    } catch (error) {
        console.log('get all product error: ',error)
    }
    return []
}

const getAllProductFruit = async () => {
  try {
      // return data;
      return await productModel.find({type: 'fruit'})
  } catch (error) {
      console.log('get all product error: ',error)
  }
  return []
}

const getAllProductMeat = async () => {
  try {
      // return data;
      return await productModel.find({type: 'meat'})
  } catch (error) {
      console.log('get all product error: ',error)
  }
  return []
}

const getAllProductFish = async () => {
  try {
      // return data;
      return await productModel.find({type: 'fish'})
  } catch (error) {
      console.log('get all product error: ',error)
  }
  return []
}

const getAllProductVegetable = async () => {
  try {
      // return data;
      return await productModel.find({type: 'vegetable'})
  } catch (error) {
      console.log('get all product error: ',error)
  }
  return []
}

const getAllProduct2 = async () => {
  try {
      // return data;
      return await productModel.find({}, 'name price category') // lấy 2 field name price
      .populate('category', 'name') // dùng khóa ngoại để truy xuất 
      .sort({price: -1}) // sắp xếp giảm dần theo giá
      .skip(2)
      .limit(2)
  } catch (error) {
      console.log('get all product error: ',error)
  }
  return []
}

const deleteProduct = async (id) => {
    try {
        // const index = data.findIndex(item => item._id.toString() == id.toString());
        
    // if (index >= 0) {
    //     data.splice(index, 1);
    // }
    await productModel.findByIdAndDelete(id);
    return true
    } catch (error) {
        console.log('delete product: ',error)
    }
    return []
}

const addNewProduct = async ( name, price, quantity, image, type) => {
  try {
      const newProduct = {
        name,
        price,
        quantity,
        image,
        type
      }
      // data.push(newProduct);
      await productModel.create(newProduct);
      return true
  } catch (error) {
      console.log('insert error: ',error)
  }
  return false;
}

const updateProduct = async (id, name, price, quantity, image, category) => {
  try {
    // let product = data.find(item => item._id.toString() == id.toString())
    let item = await productModel.findById(id);
    // if (product) {
    //     data = data.map(item => {
    //       if (item._id.toString() == id.toString()) {
    //         item.name = name ? name : item.name
    //         item.price = price ? price : item.price
    //         item.quantity = quantity ? quantity : item.quantity
    //         item.image = image ? image : item.image
    //         item.category = category ? category : item.category
    //       }
    //       return item
    //   })
    //   return true
    // }

    if (item) {
            item.name = name ? name : item.name
            item.price = price ? price : item.price
            item.quantity = quantity ? quantity : item.quantity
            item.image = image ? image : item.image
            
            await item.save()
            return true
    }
    
  } catch (error) {
      console.log('update product error: ',error)
      
  }
  return false
}

const getProduct = async (id) => {
  try {
    // let product = data.find(item => item._id.toString() == id.toString())
    let product = await productModel.findById(id)
    return product
  } catch (error) {
      console.log('get product error: ',error)
      throw error
  }
  return null;
}

const search = async (keyword) => {
  try {
    // gather than >, less than <, lte <=
    let query = {
      //price: { $gt: 1000, $lt: 2000},
      //$or: [{quantity: {$lte: 100}}, {quantity: {$gt: 20}}],
      // tìm kiếm có chứa keyword
      name: { $regex: keyword, $options: 'i'},
      // tìm kiếm theo tên
      // name: keyword,
    }
    // price > 1000 AND price < 2000
    // quantity >= 100 OR quantity > 20
    let product = await productModel.find(query)
    return product
  } catch (error) {
      console.log('Search error: ',error)
      throw error
  }
}

module.exports = {getAllProduct, deleteProduct, addNewProduct, 
            updateProduct, getProduct, search, getAllProduct2, getAllProductFruit, 
            getAllProductMeat, getAllProductVegetable, getAllProductFish}
