import CartDao from "../dao/mongoDao/cart.dao.js"
import ProductDao from "../dao/mongoDao/cart.dao.js"

const cartDao = new CartDao()
const productManagerDao = new ProductDao()

async function createCart(){
    return await cartDao.create()
}

//devuelve el carrito con id cid que se pasa por parametro
async function getById(cid){
    return await cartDao.getById(cid)
}
//agrega un producto con id pid si este existe en un carrito con id cid
async function addProductToCart(cid,pid){
    return await cartDao.addProductToCart(cid,pid)
}
async function deleteOneProductCart(cid,pid){
    return await cartDao.deleteProductInCart(cid,pid)
}
async function deleteProductsCart(cid){
    return await cartDao.deleteAllProductsInCart(cid)
}
async function updateProductsCart(cid,data){
    return await cartDao.update(cid,data)
}
async function updateQuantityProductCart(cid, pid, quantity){
    
    return await cartDao.updateQuantityProductInCart(cid, pid, quantity)
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