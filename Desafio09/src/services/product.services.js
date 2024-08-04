
import productRepository from "../persistences/mongo/repositories/product.repository.js"



async function obtenerProductos(query,options){
    return await productRepository.getAll(query,options)
    
}
async function obtenerProductoConId(pid){
    return await productRepository.getById(pid)
}
async function crearProducto(productData){
    const productExist = await productRepository.getByCode(productData.code)
    if (productExist.length > 0) 
        return false
    return await productRepository.create(productData)
}
async function actualizarProductoConId(pid,productData){
    return await productRepository.update(pid,productData)
    
}
async function borrarProductoConId(pid){
    return await productRepository.deleteOne(pid)
    
}

export default {
    obtenerProductos,
    obtenerProductoConId,
    crearProducto,
    actualizarProductoConId,
    borrarProductoConId
}