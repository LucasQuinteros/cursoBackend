import jwt from 'jsonwebtoken'


export function createToken( user ){
    const { _id, email } = user
    return jwt.sign({ _id , email }, "claveSecreta", { expiresIn : "5m"}) 
}

export function verifyToken( token ) {
    
    try {
        return jwt.verify(token,"claveSecreta")
    } catch (error) {
        return null
    }
}