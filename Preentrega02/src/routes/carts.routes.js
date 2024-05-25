import { Router } from "express";
import cartManager from "../dao/fsManagers/cartManager.js";
import ProductManager from "../dao/fsManagers/productManager.js";
import cartDao from "../dao/mongoDao/cart.dao.js";
import productDao from "../dao/mongoDao/product.dao.js";

const JSONPATH = "./src/dao/fsManagers/data/carrito.json"
const JSONPATHPRODUCTOS = "./src/dao/fsManagersdata/productos.json"

//const cartManager = new cartManagerDao(JSONPATH)
//const productManager = new ProductManager(JSONPATHPRODUCTOS)

const cartManagerDao = new cartDao()
const productManagerDao = new productDao()

const router = Router();

router.post("/",addCart);
router.get("/",getOneCart);
router.get("/:cid",getOneCart);
router.post("/:cid/products/:pid",addProductToCart)

//agrega un carrito nuevo sin productos
async function addCart(req,res){
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
        
        return res.status(200).json({status : 'success', payload : carts.products});
    } catch (error) {
        return res.status(400).json({status : 'error ',payload:error.message});
    }
}
//agrega un producto con id pid si este existe en un carrito con id cid
async function addProductToCart(req,res){
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        
    
        const p = await productManagerDao.getById(pid);
        
        //si el producto con pid no existe se produce un error
        if (!p) throw new Error(`El producto con id '${req.params.pid}' no existe`);

        
        const carts = await cartManagerDao.addProductToCart(cid,pid)
        


        return res.status(201).json({status : 'success', payload : carts.products});
    } catch (error) {
        return res.status(400).json({status : 'error ',payload:error.message});
    }
}

export default router;