import { createToken, verifyToken } from '../utils/jwt.js'
import { createHash, isValidPassword } from '../utils/hashPassword.js'
import UserDao from '../dao/mongoDao/user.dao.js'
const userDao = new UserDao()

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
        const user = req.user
        const token = createToken(user)
        res.cookie("accesToken",token,{httpOnly : true})
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
          const user = req.user
               
          return res.status(200).json({status: "success", payload: user})
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

  export default { 
    registrarUsuario,
    googleLogin,
    login,
    logout,
    getCurrent,
    
  }