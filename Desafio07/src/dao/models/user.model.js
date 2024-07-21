import mongoose from "mongoose";


const usersCollection = "users"

const userSchema = new mongoose.Schema({
    first_name : String, 
    last_name : String,
    email :  {type: String , unique : true},
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    password :  String,
    age : Number
})



const userModel = mongoose.model(usersCollection,userSchema)

export default userModel;