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
        
        let products = await producServices.obtenerProductoConId(query,options);
        
        return res.status(200).json({status: 'success', products});
        
    }
    catch (error){
        return res.status(400).json({status: 'error', payload :error.message});
    }
    
}
async function obtenerProductoConId(req,res){
    try {
        //chequeo que el product id sea valido
        const pid = req.params.pid
        

        const p = await producServices.getById(pid);
        
        
        //si se encontro el producto con id lo devuelvo sino devuelvo un error
        if (p) return res.status(200).json({status: 'success', payload : p});
        else return res.status(404).json({status: 'error', payload: `No se encontro el producto con id '${req.params.pid}'`});
        
    }
    catch (error) {
        return res.status(400).json({status: 'error', payload :error.message});
    }
}
async function crearProducto(req,res){
    try {
        const p = req.body
        
        const newProduct = await producServices.create(p)
        if (newProduct == false) return res.status(400).json({status: 'error', payload :`El producto con codigo '${p.code}' ya existe`})
        
        return res.status(201).json({status: 'success', payload : newProduct})
    } catch (error) {
        
        return res.status(400).json({status: 'error', payload :error.message});
    }
    
}
async function actualizarProductoConId(req,res){
    try {
        const pid = req.params.pid;
        const productData = req.body;


        const newProduct = await producServices.update(pid,productData)
        
        return res.status(201).json({status: 'success', payload : newProduct})
    } catch (error) {
        
        return res.status(400).json({status: 'error', payload :error.message});
        
    }
    
}
async function borrarProductoConId(req,res){
    try {
        const pid = req.params.pid
        
        
        const deleted = await producServices.deleteOne(pid)
        if (!deleted) return res.status(404).json({status: 'error', payload: `No se elimino el producto con id '${req.params.pid}'`});
        return res.status(201).json({status: 'success', payload:`se borro el producto con id ${pid}`})

    } catch (error) {
        
        return res.status(400).json({status: 'error', payload :error.message});
        
    }
    
}


export default {
    obtenerProductos,
    crearProducto,
    obtenerProductoConId,
    actualizarProductoConId,
    borrarProductoConId
}