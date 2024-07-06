import { Router } from 'express'

import UserDao from '../dao/mongoDao/user.dao.js'
import { createToken, verifyToken } from '../utils/jwt.js'
import { createHash, isValidPassword } from '../utils/hashPassword.js'
import passport from 'passport'

const userDao = new UserDao()

const router = Router()

router.post('/register',passport.authenticate('register'), registrarUsuario)
router.post('/login',passport.authenticate('login'), login)
router.get('/google',passport.authenticate('google',
                                                    {
                                                        scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
                                                        session: false,
                                                    }),googleLogin)
router.get('/logout', logout)
router.get('/current',getCurrent)
router.post('/jwt',getJwt)
async function registrarUsuario (req, res) {
  try {
    
    res.status(201).json({ status: 'success', msg: 'Usuario Creado'})
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'error', msg: 'Internal server error'})
  }
}
async function login(req,res){
    try {
        
        res.status(200).json({status : "success", msg : "Acceso concedido"})
    } catch (error) {
        console.log(error)
        res.status(500).json({status : "error", msg : "Internal server error"})
    }
}
async function googleLogin(req,res){
    try {
        res.status(200).json({status : "success", payload: req.user})
    } catch (error) {
        console.log(error)
        res.status(500).json({status : "error", msg : "Internal server error"})
    }
}
async function getCurrent(req,res){
    try {
        const accesToken = req.cookies.accesToken
        const decodedData = verifyToken(accesToken)
        if (!decodedData) return res.status(403).json({ status: "error", msg: "Invalid Token"})
             
        return res.status(200).json({status: "success", payload: decodedData})
    } catch (error) {
        console.log(error)
        res.status(500).json({status : "error", msg : "Internal server error"})
    }
}
async function getJwt(req,res){
    try {
        const {email, password} = req.body
        const user = await userDao.getByEmail(email)
        if(!user || isValidPassword(user,password)) return res.status(401).json({ status: "error", msg: "usuario o contraseña no válido" })
        
        const token = createToken(user)
        res.cookie("accesToken",token,{httpOnly : true})
        return res.status(200).json({ status: "success", payload: user, token });

    } catch (error) {
        console.log(error)
        res.status(500).json({status : "error", msg : "Internal server error"})
    }
}
async function logout(req,res){
    try {
        req.session.destroy()
        
        res.clearCookie("accesToken")
        res.clearCookie("connect.sid")
        res.status(200).json({status : "success", payload: "logout exitoso"})
    } catch (error) {
        console.log(error)
        res.status(500).json({status : "error", msg : "Internal server error"})
    }
}

export default router;