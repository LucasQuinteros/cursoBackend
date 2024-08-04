import userModel  from "../models/user.model.js"



async function getById(id){
    const user = await userModel.findOne({_id : id})
    return user;
    
}

async function getByEmail(email){
    const user = await userModel.findOne({email})
    return user;
}
async function create(data){
    const user = await userModel.create(data)
    return user
}
async function update(id,data){
    
    const user = await userModel.findByIdAndUpdate(id,data, {new : true})
    return user
    
}
async function deleteOne(id){
    const user = await userModel.deleteOne({_id : id})
    if ( user.deletedCount === 0) return false
    return true
    
}

export default {
    getById,
    getByEmail,
    create,
    update,
    deleteOne
}