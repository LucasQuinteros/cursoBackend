import productModel from "../models/product.model.js";




class productDao{
    constructor(){}
    async getAll(query,options){
        
        const products = await productModel.paginate(query,options)
        return products;
    }
    async getMany(number){
        const products = await productModel.find().limit(number)
        return products;
    }
    async getByCode(productCode){
        const products = await productModel.find({code : productCode})
        return products;
    }
    async getById(id){
        const product = await productModel.findById(id)
        return product
    }
    async create(data){
        const product = await productModel.create(data)
        return product
    }
    async update(id,data){
        await productModel.findByIdAndUpdate(id,data)
        const product = await productModel.findById(id)
        return product
    }
    async deleteOne(id){
        const product = await productModel.deleteOne({_id : id})
        if ( product.deletedCount === 0) return false
        return true
    }
}


export default productDao;