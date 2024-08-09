import { Router } from "express";



import productsController from "../controllers/products.controller.js"
import { authorization,passportCall } from "../middleware/passport.middleware.js";
import { productDataValidator } from "../validators/productData.validator.js";

//import ProductManager  from "../dao/fsManagers/productManager.js";
//const JSONPATH = "./src/dao/fsManagers/data/productos.json";

//const productManager = new ProductManager(JSONPATH);



const router = Router();


router.get('/',productsController.obtenerProductos);
router.get('/:pid', productsController.obtenerProductoConId);

router.get("/mockingproducts/:quantity",passportCall('jwt'),authorization('admin'), productsController.productMock);

router.post('/',passportCall('jwt'),authorization('admin'),productDataValidator,productsController.crearProducto);

router.put('/:pid',passportCall('jwt'),authorization('admin'), productsController.actualizarProductoConId);
router.delete('/:pid',passportCall('jwt'),authorization('admin'), productsController.borrarProductoConId);


export default router;