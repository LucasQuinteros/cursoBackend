import mongoose from "mongoose";


const productCollection = "products"

const productSchema = new mongoose.Schema({
    title: {
        type : String,
        require : true
    },
    description: {
        type : String,
        require : true
    },
    price: {
        type : Number,
        require : true
    },
    thumbnail: {
        type : Array,
        default : []
    },
    code: {
        type : String,
        require : true
    },
    stock: {
        type : Number,
        require : true
    },
    category: {
        type : String,
        require : true
    },
    status: {
        type : Boolean,
        default : true
    }
})

const productModel = mongoose.model(productCollection,productSchema)

export default productModel