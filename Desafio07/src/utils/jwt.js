import jwt from 'jsonwebtoken'
import envs from '../config/env.config.js'

export function createToken( user ){
    const { _id, email } = user
    return jwt.sign({ _id , email }, envs.CODE_SECRET, { expiresIn : "5m"}) 
}

export function verifyToken( token ) {
    
    try {
        return jwt.verify(token,envs.CODE_SECRET)
    } catch (error) {
        return null
    }
}