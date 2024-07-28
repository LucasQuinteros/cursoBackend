import { Router } from "express";



import producstController from "../controllers/producst.controller.js"
import { authorization,passportCall } from "../middleware/passport.middleware.js";
import { productDataValidator } from "../validators/productData.validator.js";

//import ProductManager  from "../dao/fsManagers/productManager.js";
//const JSONPATH = "./src/dao/fsManagers/data/productos.json";

//const productManager = new ProductManager(JSONPATH);



const router = Router();

router.get('/',producstController.obtenerProductos);
router.get('/:pid', producstController.obtenerProductoConId);

router.post('/',passportCall('jwt'),authorization('admin'),productDataValidator,producstController.crearProducto);

router.put('/:pid',passportCall('jwt'),authorization('admin'), producstController.actualizarProductoConId);
router.delete('/:pid',passportCall('jwt'),authorization('admin'), producstController.borrarProductoConId);


export default router;