
import cartsRepository from "../persistences/mongo/repositories/carts.repository.js"




async function createCart(){
    return await cartsRepository.create()
}

//devuelve el carrito con id cid que se pasa por parametro
async function getById(cid){
    return await cartsRepository.getById(cid)
}
//agrega un producto con id pid si este existe en un carrito con id cid
async function addProductToCart(cid,pid){
    return await cartsRepository.addProductToCart(cid,pid)
}
async function deleteOneProductCart(cid,pid){
    return await cartsRepository.deleteProductInCart(cid,pid)
}
async function deleteProductsCart(cid){
    return await cartsRepository.deleteAllProductsInCart(cid)
}
async function updateProductsCart(cid,data){
    return await cartsRepository.update(cid,data)
}
async function updateQuantityProductCart(cid, pid, quantity){
    
    return await cartsRepository.updateQuantityProductInCart(cid, pid, quantity)
}

export default {
    createCart,
    getById,
    addProductToCart,
    deleteOneProductCart,
    deleteProductsCart,
    updateProductsCart,
    updateQuantityProductCart
}