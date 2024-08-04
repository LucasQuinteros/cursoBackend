import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";




async function getById(id){
    //const cart = await cartModel.find()
    const cart = await cartModel.findById(id).populate("products.product")
    return cart
}
async function create(data){
    const cart = await cartModel.create(data)
    return cart
}
async function update(cid,data){
    
    await cartModel.updateOne({ _id: cid }, { $set: { products: [] } });
    
    await cartModel.updateOne({ _id: cid }, { $set: { products: data } });
    const cart = await cartModel.findById(cid);
    return cart;
}
async function deleteProductInCart(cid,pid){
    
    const cartUpdate = await cartModel.findOneAndUpdate(
        {_id : cid, "products.product": pid},
        {$inc : {"products.$.quantity" : -1}},
        {new : true})
    
    return cartUpdate;
}
async function deleteAllProductsInCart(cid){

    const cartUpdate = await cartModel.findByIdAndUpdate(
        {_id : cid},
        {$set : {products : []}},
        {new : true})
    
    
    return cartUpdate;
}

async function addProductToCart(cid,pid){
    

    const cartUpdated = await cartModel.findOneAndUpdate(
        {_id : cid, "products.product": pid},
        {$inc : {"products.$.quantity" : 1}},
        {new : true})

    if (!cartUpdated){
        return await cartModel.findOneAndUpdate(
            { _id: cid }, 
            { $push: { products: { product: pid, quantity: 1 } } },
            {new : true});
    }

    
    return cartUpdated
}
async function updateQuantityProductInCart(cid, pid, quantity) {
    
    
    const cart = await cartModel.findOneAndUpdate(
        { _id: cid, "products.product": pid }, 
        { $set: { "products.$.quantity": quantity } },
        {new : true});
    
    
    
    return cart;
    };


export default {
    getById,
    create,
    update,
    deleteProductInCart,
    deleteAllProductsInCart,
    addProductToCart,
    updateQuantityProductInCart

};