import { Router } from 'express'



import { authorization, passportCall } from "../middleware/passport.middleware.js";
import { userLoginValidator } from "../validators/userLogin.validator.js";

import sessionController from '../controllers/session.controller.js';


const router = Router()

router.post('/register',passportCall('register'), sessionController.registrarUsuario)
router.post('/login',passportCall('login'), sessionController.login)
router.get('/google',passportCall('google',
                                            {
                                                scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
                                                session: false,
                                            }),sessionController.googleLogin)
router.get('/logout', sessionController.logout)
router.get('/current',passportCall("jwt"), authorization("user"),sessionController.getCurrent)



export default router;