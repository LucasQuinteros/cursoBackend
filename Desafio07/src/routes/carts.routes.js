import { Router } from "express";
import cartManager from "../dao/fsManagers/cartManager.js";
import ProductManager from "../dao/fsManagers/productManager.js";
import cartsController from "../controllers/carts.controller.js";
import {passportCall,authorization} from "../middleware/passport.middleware.js"

const JSONPATH = "./src/dao/fsManagers/data/carrito.json"
const JSONPATHPRODUCTOS = "./src/dao/fsManagersdata/productos.json"

//const cartManager = new cartManagerDao(JSONPATH)
//const productManager = new ProductManager(JSONPATHPRODUCTOS)



const router = Router();

router.post("/",passportCall("jwt"), authorization("user"),cartsController.createCart);
router.get("/",passportCall("jwt"), authorization("user"),cartsController.getOneCart);
router.get("/:cid",passportCall("jwt"), authorization("user"),cartsController.getOneCart);
router.post("/:cid/products/:pid",passportCall("jwt"), authorization("user"),cartsController.addProductToCart)
router.delete("/:cid/products/:pid",passportCall("jwt"), authorization("user"),cartsController.deleteOneProductCart)
router.delete("/:cid", passportCall("jwt"), authorization("user"),cartsController.deleteProductsCart)
router.put("/:cid",passportCall("jwt"), authorization("user"),cartsController.updateProductsCart)
router.put("/:cid/products/:pid",passportCall("jwt"), authorization("user"),cartsController.updateQuantityProductCart)


export default router;