import fs from 'node:fs';




class CarritoManager{
    constructor(path){
        this.path = path
    }
    //agrega un carrito en el archivo con id unico y sin productos
    async addCart(){
        let allCarts = await this.getCarts();
        
        
        const newCart = {
            id : allCarts.length,
            products : []
        }
        
        allCarts.push(newCart);
        await fs.promises.writeFile(this.path,JSON.stringify(allCarts,null,4));
        return newCart;
    }
    //devuelve todos los carritos del archivo
    async getCarts(){
        let jsondata = await fs.promises.readFile(this.path,"utf-8");
        let carts = JSON.parse(jsondata) || [];
        
        return carts;
    }
    //devuelve el carrito con idbuscado si se encuentra en el archivo
    async getOneCart(idBuscado){
        let allCarts = await this.getCarts();
        let c = allCarts.find((element) => element.id === idBuscado);
        if (!c)
            throw new Error(`(getOneCart)Error no se encontro el producto con id ${idBuscado}`);

        return c;
    }
    //agrega un producto a un carrito si existe sino da error
    //si el producto en ese carrito existe agrega una unidad al producto
    //si no existe el producto en el carrito agrega el id del producto al carrito con quantity uno
    async addProductToCart(idCart,idProducto){
        let allCarts = await this.getCarts();
        const cart = allCarts.find((element)=> element.id === idCart);
        if (!cart) throw new Error(`(addProductToCart)Error no se encontro el carrito con id ${idCart}`);
        
        const indexProduct = allCarts[cart.id].products.findIndex((element)=> element.product === idProducto);

        if (indexProduct === -1){
            const newProduct = {
                product : idProducto,
                quantity : 1
            }
            allCarts[cart.id].products.push(newProduct);
        }
        else {
            allCarts[cart.id].products[indexProduct].quantity += 1;
        }

        await fs.promises.writeFile(this.path,JSON.stringify(allCarts,null,4));
        return  allCarts[cart.id];
    }
    
}

export default CarritoManager;