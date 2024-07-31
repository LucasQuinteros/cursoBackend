import { Router } from 'express'



import { authorization, passportCall } from "../middleware/passport.middleware.js";
import { userLoginValidator } from "../validators/userLogin.validator.js";

import sessionController from '../controllers/session.controller.js';



const router = Router()

router.post('/register',passportCall('register'),userLoginValidator, sessionController.registrarUsuario)
router.post('/login',passportCall('login'), sessionController.login)
router.get('/google',passportCall('google',
                                            {
                                                scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
                                                session: false,
                                            }),sessionController.googleLogin)
router.get('/logout', sessionController.logout)
router.get('/current',passportCall("jwt"),sessionController.getCurrent)

router.get("/sms", async (req, res) => {
    await sendSMS("", "Coder es los más !!!");
  
    return res.status(200).json({ status: "ok", msg: "SMS enviado" });
  });
  
router.get("/email", async (req, res) => {
    const { name,email } = req.body;
  
    const template = `
      <div>
        <h1> Bienvenidos ${name} a nuestra App </h1>
        <img src="cid:gatito" />
      </div>
      `;
  
    await sendMail(email, "Teste nodemailer", "Este es un mensaje de prueba", template);
  
    return res.status(200).json({ status: "ok", msg: "Email enviado" });
  });

export default router;