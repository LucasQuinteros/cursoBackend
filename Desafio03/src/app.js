import express from 'express';
import ProductManager  from "./services/productManager.js";

const JSONPATH = "./data/productos.json"

const app = express();
const port = 8080;


const productManager = new ProductManager(JSONPATH);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/products',obtenerProductos)

app.get('/products/:pid', obtenerProductoConId)

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
        if (!limit) return res.status(400).json(`La cantidad '${req.query.limit}' no es valida` );
        
        //devuelvo la cantidad de items que me piden si es menor a la longitud de la lista
        //sino la lista completa
        let products = await productManager.getProducts();
        if (limit < products.length ){
            products = products.slice(0,limit)
            
        }
        return res.status(200).json(products);
        
    }
    catch (error){
        return res.status(500).json("Hubo un error interno");
    }
    
}
async function obtenerProductoConId(req,res){
    try {
        //chequeo que el product id sea valido
        const pid = parseInt(req.params.pid);
        if (!pid) return res.status(400).json(`El id '${req.params.pid}' no es valido` );

        const p = await productManager.getProductById(pid);
        
        
        //si se encontro el producto con id lo devuelvo sino devuelvo un error
        if (p) return res.status(200).json(p);
        else return res.status(404).json(`No se encontro el producto con id '${req.params.pid}'`);
        
    }
    catch (error) {
        return res.status(500).json("Hubo un error interno");
    }
}









app.listen(port, ()=> {console.log(`Server ready on port  ${port}`)})

