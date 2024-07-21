import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";



class CartDao{
    constructor(){

    }
    
    
    async getById(id){
        //const cart = await cartModel.find()
        const cart = await cartModel.findById(id).populate("products.product")
        return cart
    }
    async create(data){
        const cart = await cartModel.create(data)
        return cart
    }
    async update(cid,data){
        
        await cartModel.updateOne({ _id: cid }, { $set: { products: [] } });
        
        await cartModel.updateOne({ _id: cid }, { $set: { products: data } });
        const cart = await cartModel.findById(cid);
        return cart;
    }
    async deleteProductInCart(cid,pid){
        const product = await productModel.findById(pid)
        if( !product) return { product : false}

        const cart = await cartModel.findOneAndUpdate({_id : cid, "products.product": pid},{$inc : {"products.$.quantity" : -1}})
        //const cart = await cartModel.deleteOne({_id : id})
        if ( !cart) return {cart : false}
        const cartUpdate = await cartModel.findById(cid);
        return cartUpdate;
    }
    async deleteAllProductsInCart(cid){

        const cart = await cartModel.findByIdAndUpdate({_id : cid},{$set : {products : []}})
        
        if ( !cart) return {cart : false}
        const cartUpdate = await cartModel.findById(cid);
        return cartUpdate;
    }

    async addProductToCart(cid,pid){
        const product = await productModel.findById(pid);
        if (!product) return { product: false };
        const cart = await cartModel.findById(cid);
        if (!cart) return { cart: false };

        const productInCart = await cartModel.findOneAndUpdate({_id : cid, "products.product": pid},{$inc : {"products.$.quantity" : 1}})
        if (!productInCart){
            await cartModel.updateOne({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } });
        }

        const cartUpdate = await cartModel.findById(cid);
        

        return cartUpdate
    }
    async updateQuantityProductInCart(cid, pid, quantity) {
        const product = await productModel.findById(pid);
        if (!product) return { product: false };
      
        const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": quantity } });
        if (!cart) return { cart: false };
      
        const cartUpdate = await cartModel.findById(cid);
        return cartUpdate;
      };
}

export default CartDao;