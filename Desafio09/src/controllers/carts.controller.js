import cartsServices from "../services/carts.services.js"
import ticketServices from "../services/ticket.services.js";

//agrega un carrito nuevo sin productos
async function createCart(req,res){
    try {
        
        const newCart = await cartsServices.createCart();

        res.status(201).json({status : 'success', payload : newCart});
    } catch (error) {
        res.status(400).json({status : 'error ',payload:error.message});
    }
}

//devuelve el carrito con id cid que se pasa por parametro
async function getById(req,res){
    try {
        const cid = req.params.cid;
        
        
        const cart = await cartsServices.getById(cid);
        
        return res.status(200).json({status : 'success', payload : cart});
    } catch (error) {
        return res.status(400).json({status : 'error ',payload:error.message});
    }
}
//agrega un producto con id pid si este existe en un carrito con id cid
async function addProductToCart(req,res){
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        
    
        
        const cart = await cartsServices.addProductToCart(cid,pid)
        
        
        return res.status(201).json({status : 'success', payload : cart});
    } catch (error) {
        return res.status(400).json({status : 'error ',payload:error.message});
    }
}
async function deleteOneProductCart(req,res){
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        
        const cart = await cartsServices.deleteOneProductCart(cid,pid)

        return res.status(201).json({status : 'success', payload : cart});
    } catch (error) {
        return res.status(400).json({status : 'error ',msg:error.message});
    }
}
async function deleteProductsCart(req,res){
    try {
        const cid = req.params.cid;
        
        
        const cart = await cartsServices.deleteProductsCart(cid)

        
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
        
        const cart = await cartsServices.update(cid, data);
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
        
        const cart = await cartsServices.updateQuantityProductInCart(cid, pid, quantity);
        if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
        if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    
        res.status(200).json({ status: "success", payload: cart });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
      }
    
}
async function purchase(req,res){
    try {
        const { cid } = req.params;
        const cart = await cartsServices.getById(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
        // Obtener el total del carrito
        const total = await cartsServices.purchase(cid);
        // Crear el ticket
        const ticket = await ticketServices.createTicket(req.user.email, total);
        
        
        return res.status(201).json({status : 'success', payload : ticket });
    } catch (error) {
        return res.status(400).json({status : 'error ',payload:error.message});
    }
}

export default {
    createCart,
    getById,
    addProductToCart,
    deleteOneProductCart,
    deleteProductsCart,
    updateProductsCart,
    updateQuantityProductCart,
    purchase
}