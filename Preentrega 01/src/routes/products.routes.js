import { Router } from "express";
import ProductManager  from "../managers/productManager.js";


const JSONPATH = "./src/data/productos.json"

const productManager = new ProductManager(JSONPATH);

const router = Router();

router.get('/',obtenerProductos);
router.post('/',crearProducto);

router.get('/:pid', obtenerProductoConId);
router.put('/:pid', actualizarProductoConId);
router.delete('/:pid', borrarProductoConId);
async function obtenerProductos(req,res){
    let limit = req.query.limit;
    try{
        //si no se pasa limit en el query devuelvo toda la lista
        if (!limit) {
            const products = await productManager.getProducts();
            return res.status(200).json(products);
        } 
        //chequeo que limit sea un entero
        limit = parseInt(limit);
        if (isNaN(limit)) return res.status(400).json(`La cantidad '${req.query.limit}' no es valida` );
        
        //devuelvo la cantidad de items que me piden si es menor a la longitud de la lista
        //sino la lista completa
        let products = await productManager.getProducts();
        if (limit < products.length ){
            products = products.slice(0,limit)
            
        }
        return res.status(200).json(products);
        
    }
    catch (error){
        res.status(400).json({"error":error.message});
    }
    
}
async function obtenerProductoConId(req,res){
    try {
        //chequeo que el product id sea valido
        const pid = parseInt(req.params.pid);
        if (isNaN(pid)) return res.status(400).json(`El id '${req.params.pid}' no es valido` );

        const p = await productManager.getProductById(pid);
        
        
        //si se encontro el producto con id lo devuelvo sino devuelvo un error
        if (p) return res.status(200).json(p);
        else return res.status(404).json(`No se encontro el producto con id '${req.params.pid}'`);
        
    }
    catch (error) {
        res.status(400).json({"error":error.message});
    }
}
async function crearProducto(req,res){
    try {
        const p = req.body
        
        const newProduct = await productManager.addProduct(p)
        
        res.status(201).json(newProduct)
    } catch (error) {
        
        res.status(400).json({"error":error.message});
    }
    
}
async function actualizarProductoConId(req,res){
    try {
        const pid = parseInt(req.params.pid);
        const p = req.body;
        
        if (isNaN(pid)) return res.status(400).json(`El id '${req.params.pid}' no es valido` );

        const newProduct = await productManager.updateProduct(pid,p)
        
        res.status(201).json(newProduct)
    } catch (error) {
        
        res.status(400).json({"error":error.message});
        
    }
    
}
async function borrarProductoConId(req,res){
    try {
        const pid = parseInt(req.params.pid);
        
        if (isNaN(pid)) return res.status(400).json(`El id '${req.params.pid}' no es valido` );

        await productManager.deleteProduct(pid)
        
        res.status(201).json({"message":`se borro el producto con id ${pid}`})

    } catch (error) {
        
        res.status(400).json({"error":error.message});
        
    }
    
}
export default router;