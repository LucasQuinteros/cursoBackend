import mongoose from "mongoose";


const ticketCollection = "tickets"

const ticketSchema = new mongoose.Schema({
    code : {
        type: String,
        require : true,
        unique : true
        
    },
    purchase_datetime : {
        type : Date,
        default : Date.now()
    },
    amount : {
        type: Number,
        require : true
    },
    purchaser : {
        type : String,
        require : true
    }
})



const ticketModel = mongoose.model(ticketCollection,ticketSchema)

export default ticketModel;