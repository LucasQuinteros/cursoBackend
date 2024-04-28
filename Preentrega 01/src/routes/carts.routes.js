import { Router } from "express";
import CarritoManager from "../managers/cartManager.js";
import ProductManager from "../managers/productManager.js";


const JSONPATH = "./src/data/carrito.json"
const JSONPATHPRODUCTOS = "./src/data/productos.json"

const carritoManager = new CarritoManager(JSONPATH)
const productManager = new ProductManager(JSONPATHPRODUCTOS)
const router = Router();

router.post("/",addCart);
router.get("/:cid",getOneCart);
router.post("/:cid/products/:pid",addProductToCart)

//agrega un carrito nuevo sin productos
async function addCart(req,res){
    try {
        
        const newCart = await carritoManager.addCart();

        res.status(201).json(newCart);
    } catch (error) {
        res.status(400).json({"error":error.message});
    }
}
//devuelve el carrito con id cid que se pasa por parametro
async function getOneCart(req,res){
    try {
        const cid = parseInt(req.params.cid);
        
        if (isNaN(cid)) return res.status(400).json(`El id '${req.params.cid}' no es valido` );

        const carts = await carritoManager.getOneCart(cid);

        res.status(200).json(carts.products);
    } catch (error) {
        res.status(400).json({"error":error.message});
    }
}
//agrega un producto con id pid si este existe en un carrito con id cid
async function addProductToCart(req,res){
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        if (isNaN(cid)) return res.status(400).json(`El cart id '${req.params.cid}' no es valido` );
        if (isNaN(pid)) return res.status(400).json(`El product id '${req.params.pid}' no es valido` );
        
        const p = await productManager.getProductById(pid);
        if (!p) throw new Error(`El producto con id '${req.params.pid}' no existe`);
        console.log(p)
        const carts = await carritoManager.addProductToCart(cid,pid);


        res.status(201).json(carts.products);
    } catch (error) {
        res.status(400).json({"error":error.message});
    }
}

export default router;