import ProductDao  from "../dao/mongoDao/product.dao.js"

const productDao = new ProductDao()

async function obtenerProductos(query,options){
    return await productDao.getAll(query,options)
    
}
async function obtenerProductoConId(pid){
    return await productDao.getById(pid)
}
async function crearProducto(productData){
    const productExist = await productDao.getByCode(p.code)
    if (productExist.length > 0) 
        return false
    return await productDao.create(productData)
}
async function actualizarProductoConId(pid,productData){
    return await productDao.update(pid,productData)
    
}
async function borrarProductoConId(pid){
    return await productDao.deleteOne(pid)
    
}

export default {
    obtenerProductos,
    obtenerProductoConId,
    crearProducto,
    actualizarProductoConId,
    borrarProductoConId
}