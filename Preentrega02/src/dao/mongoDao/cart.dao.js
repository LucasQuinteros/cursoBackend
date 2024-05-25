import cartModel from "../models/cart.model.js";




class cartDao{
    constructor(){

    }
   
    
    async getById(id){
        const cart = await cartModel.findById(id)
        return cart
    }
    async create(data){
        const cart = await cartModel.create(data)
        return cart
    }
    async update(id,data){
        await cartModel.findByIdAndUpdate(id,data)
        const cart = await cartModel.findById(id)
        return cart
    }
    async deleteOne(id){
        const cart = await cartModel.deleteOne({_id : id})
        if ( cart.deletedCount === 0) return false
        return true
    }
    async addProductToCart(cid,pid){

        let  cart = await this.getById(cid);

        if (!cart) throw new Error(`El carrito con id '${req.params.pid}' no existe`);
        
        const indexProduct = cart.products.findIndex((element)=> element.product === pid);

        //si no encontre el producto dentro del carrito agrego su id con cantidad 1
        //si esta dentro del carrito aumento su cantidad en 1
        if (indexProduct === -1){
            const newProduct = {
                product : pid,
                quantity : 1
            }
            cart.products.push(newProduct);
        }
        else {
            cart.products[indexProduct].quantity += 1;
        }

        cart = await this.update(cid,cart);
        console.log(cart)
        return cart
    }
    
}

export default cartDao;