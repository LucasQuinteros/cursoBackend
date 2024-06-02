import { Router } from "express";

import UserDao from "../dao/mongoDao/user.dao.js";






const userDao = new UserDao()


const router = Router();

router.post("/register",registrarUsuario)
router.post("/login",login)
router.get("/logout",logout)

async function registrarUsuario(req,res){
    try {
        const userData = req.body

        const newUser = await userDao.create(userData)
        if (!newUser) return res.status(400).json({status : "error", msg : "no se pudo crear el usuario"})
            
        
        res.status(201).json({status : "success", payload: userData})
    } catch (error) {
        console.log(error)
        res.status(500).json({status : "error", msg : "Internal server error"})
    }
}
async function login(req,res){
    try {
        const {email,password} = req.body

        if (email === "adminCoder@coder.com" && password === "adminCod3r123"){
            req.session.user = {
                email,
                role : "admin"
            }
            return res.status(200).json({status : "success", payload: req.session.user})
        }

        const user = await userDao.getByEmail(email)
        req.session.user = {
            email,
            role : "user"
        }
        if (!user || user.password !== password)  return res.status(401).json({status : "error", msg : "Email o password no validos"})
            
        
        res.status(200).json({status : "success", payload: req.session.user})
    } catch (error) {
        console.log(error)
        res.status(500).json({status : "error", msg : "Internal server error"})
    }
}
async function logout(req,res){
    try {
        req.session.destroy()

    
        res.status(200).json({status : "success", payload: "logout exitoso"})
    } catch (error) {
        console.log(error)
        res.status(500).json({status : "error", msg : "Internal server error"})
    }
}

export default router;