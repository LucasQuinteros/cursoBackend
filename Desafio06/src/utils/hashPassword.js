import bcrypt from 'bcrypt'


export function createHash (password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
} 

export function isValidPassword(user,password){
    return bcrypt.compareSync(password,user.password)
}