import mongoose from 'mongoose'




class Database{
    constructor(urlDb){
        try {
            mongoose.connect(urlDb)
            console.log("Mongo DB conectado")
        } catch (error) {
            console.log(error)
        }
    }
}

export default Database