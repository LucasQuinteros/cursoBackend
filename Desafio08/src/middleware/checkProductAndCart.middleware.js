import cartsServices from "../services/carts.services.js";
import productServices from "../services/product.services.js";



export async function checkProductAndCart(req,){
    const cid = req.params.cid;
    const pid = req.params.pid;

    const product = await productServices.obtenerProductoConId(pid)
    const cart = await cartsServices.getById(cid)
    if (!product) return res.status(404).json({status : 'error ',msg: "no se encontro el producto"});
    if (!cart) return res.status(404).json({status : 'error ',msg: "no se encontro el carrito"});
}