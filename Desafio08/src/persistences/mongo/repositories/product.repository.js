import productModel  from "../models/user.model.js"



async function getAll(query,options){
    const products = await productModel.paginate(query,options)
    return products;
    
}
async function getById(id){
    const product = await productModel.findById(id)
    return product
}
async function getMany(number){
    const products = await productModel.find().limit(number)
    return products;
}
async function getByCode(productCode){
    const products = await productModel.find({code : productCode})
    return products;
}
async function create(data){
    const product = await productModel.create(data)
    return product
}
async function update(id,data){
    
    const product = await productModel.findByIdAndUpdate(id,data, {new : true})
    return product
    
}
async function deleteOne(id){
    const product = await productModel.deleteOne({_id : id})
    if ( product.deletedCount === 0) return false
    return true
    
}

export default {
    getAll,
    getMany,
    getById,
    getByCode,
    create,
    update,
    deleteOne
}