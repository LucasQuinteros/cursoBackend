import { Router } from "express";

import ProductManager  from "../dao/fsManagers/productManager.js";

import producstController from "../controllers/producst.controller.js"
import { authorization,passportCall } from "../middleware/passport.middleware.js";

const JSONPATH = "./src/dao/fsManagers/data/productos.json";

//const productManager = new ProductManager(JSONPATH);



const router = Router();

router.get('/',producstController.obtenerProductos);
router.get('/:pid', producstController.obtenerProductoConId);

router.post('/',passportCall('jwt'),authorization('admin'),producstController.crearProducto);

router.put('/:pid',passportCall('jwt'),authorization('admin'), producstController.actualizarProductoConId);
router.delete('/:pid',passportCall('jwt'),authorization('admin'), producstController.borrarProductoConId);


export default router;