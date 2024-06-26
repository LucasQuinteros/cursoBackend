import mongoose from "mongoose";


const usersCollection = "users"

const userSchema = new mongoose.Schema({
    first_name : String, 
    last_name : String,
    email :  {type: String , unique : true},
    password :  String,
    age : Number
})



const userModel = mongoose.model(usersCollection,userSchema)

export default userModel;