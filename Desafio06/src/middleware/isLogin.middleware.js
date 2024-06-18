


export async function isLogin(req,res,next){
    if(req.session.user){
        next()
    }
    else{
        res.status(401).json({status: "Error", msg : "Usuario no logueado"})
    }
}

export default{
    isLogin
}