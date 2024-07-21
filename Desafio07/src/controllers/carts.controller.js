

import cartDao from "../dao/mongoDao/cart.dao.js";
import productDao from "../dao/mongoDao/product.dao.js";


const cartManagerDao = new cartDao()
const productManagerDao = new productDao()

//agrega un carrito nuevo sin productos
async function createCart(req,res){
    try {
        
        const newCart = await cartManagerDao.create();

        res.status(201).json({status : 'success', payload : newCart});
    } catch (error) {
        res.status(400).json({status : 'error ',payload:error.message});
    }
}

//devuelve el carrito con id cid que se pasa por parametro
async function getOneCart(req,res){
    try {
        const cid = req.params.cid;
        let carts;
        
        carts = await cartManagerDao.getById(cid);
        
        return res.status(200).json({status : 'success', payload : carts});
    } catch (error) {
        return res.status(400).json({status : 'error ',payload:error.message});
    }
}
//agrega un producto con id pid si este existe en un carrito con id cid
async function addProductToCart(req,res){
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        
    
        
        const cart = await cartManagerDao.addProductToCart(cid,pid)
        
        if (cart.product == false ) return res.status(404).json({status : 'error ',msg: "no se encontro el producto"});
        if (cart.cart == false ) return res.status(404).json({status : 'error ',msg: "no se encontro el carrito"});

        return res.status(201).json({status : 'success', payload : cart});
    } catch (error) {
        return res.status(400).json({status : 'error ',payload:error.message});
    }
}
async function deleteOneProductCart(req,res){
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        
        const cart = await cartManagerDao.deleteProductInCart(cid,pid)

        if (cart.product == false ) return res.status(404).json({status : 'error ',msg: "no se encontro el producto"});
        if (cart.cart == false ) return res.status(404).json({status : 'error ',msg: "no se encontro el carrito"});
        return res.status(201).json({status : 'success', payload : cart});
    } catch (error) {
        return res.status(400).json({status : 'error ',msg:error.message});
    }
}
async function deleteProductsCart(req,res){
    try {
        const cid = req.params.cid;
        
        
        const cart = await cartManagerDao.deleteAllProductsInCart(cid)

        
        if (cart.cart == false ) return res.status(404).json({status : 'error ',msg: "no se encontro el carrito"});
        return res.status(201).json({status : 'success', payload : cart});
    } catch (error) {
        return res.status(400).json({status : 'error ',msg:error.message});
    }
}
async function updateProductsCart(req,res){
    try {
        const  {cid}    = req.params;
        const data    = req.body.products
        
        const cart = await cartManagerDao.update(cid, data);
        if (!cart) return res.status(404).json({ status: "Error", msg: "no se encontro el carrito" });
        
        res.status(200).json({ status: "success", payload: cart });
      } catch (error) {
        console.log(error);
        res.status(500).json({status : 'error ',payload:error.message});
      }
      
}
async function updateQuantityProductCart(req,res){
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        
        const cart = await cartManagerDao.updateQuantityProductInCart(cid, pid, quantity);
        if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
        if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    
        res.status(200).json({ status: "success", payload: cart });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
      }
    
}


export default {
    createCart,
    getOneCart,
    addProductToCart,
    deleteOneProductCart,
    deleteProductsCart,
    updateProductsCart,
    updateQuantityProductCart
}