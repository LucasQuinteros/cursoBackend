import { Router } from "express";
import productsRouters from "./products.routes.js"
import cartsRouters from "./carts.routes.js"
import sessionRouters from "./session.routes.js"
import { isLogin } from "../middleware/isLogin.middleware.js";
const router = Router()

router.use("/products",isLogin, productsRouters);
router.use("/carts",isLogin, cartsRouters);
router.use("/session", sessionRouters);

export default router;