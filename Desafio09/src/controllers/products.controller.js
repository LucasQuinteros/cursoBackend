import { badRequestError, notFoundError } from "../errors/customError.js";
import { generateProductMocks } from "../mocks/product.mocks.js";
import producServices from "../services/product.services.js"


async function obtenerProductos(req,res){
    let { limit, sort, page, category,status} = req.query;
    let query = {}
    try{
        
        //chequeo que limit sea un entero
        limit = parseInt(limit);
        
        let options = {
            limit : limit || 10,
            page : page || 1,
            
            lean: true
        }
        
        if (category) {
            query = { category  }
        }
        if (status){
            query = { status  }
        }
        if (sort != undefined){
            options = {
                ...options,
                sort : {
                    price : sort === "asc" ? 1 : -1
                }
            }
        }
        //console.log(category,status,query,options)
        
        let products = await producServices.obtenerProductos(query,options);
        
        return res.status(200).json({status: 'success', products});
        
    }
    catch (error){
        console.log(error)
        next(error)
    }
    
}
async function obtenerProductoConId(req,res){
    try {
        //chequeo que el product id sea valido
        const pid = req.params.pid
        

        const p = await producServices.obtenerProductoConId(pid);
        
        
        //si se encontro el producto con id lo devuelvo sino devuelvo un error
        if (!p)  notFoundError( `No se encontro el producto con id '${req.params.pid}'`);

        return res.status(200).json({status: 'success', payload : p});
    }
    catch (error) {
        next(error)
    }
}
async function crearProducto(req,res){
    try {
        const p = req.body
        
        const newProduct = await producServices.crearProducto(p)
        if (newProduct == false) throw badRequestError(`El producto con codigo '${p.code}' ya existe`)
        
        return res.status(201).json({status: 'success', payload : newProduct})
    } catch (error) {
        
        next(error)
    }
    
}
async function actualizarProductoConId(req,res){
    try {
        const pid = req.params.pid;
        const productData = req.body;


        const newProduct = await producServices.actualizarProductoConId(pid,productData)
        
        return res.status(201).json({status: 'success', payload : newProduct})
    } catch (error) {
        
        next(error)
        
    }
    
}
async function borrarProductoConId(req,res){
    try {
        const pid = req.params.pid
        
        
        const deleted = await producServices.borrarProductoConId(pid)
        if (!deleted) throw notFoundError(`No se elimino el producto con id '${req.params.pid}'`);
        return res.status(201).json({status: 'success', payload:`se borro el producto con id ${pid}`})

    } catch (error) {
        
        next(error)
        
    }
    
}
async function productMock(req,res){
    try {
        const quantity = req.params.quantity
        const products = generateProductMocks(quantity)
        
        return res.status(201).json({status: 'success', payload: products})
    }
    catch( error ) {
        console.log(error)
        next(error)
    }
}

export default {
    obtenerProductos,
    crearProducto,
    obtenerProductoConId,
    actualizarProductoConId,
    borrarProductoConId,
    productMock
}