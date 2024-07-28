
import fs from 'node:fs';





class ProductManager{
    constructor(path){
        //this.products = [];
        this.path = path
    }

    //lee el archivo en this.path y agrega un producto nuevo con status true 
    //si todos los campos menos thumbnail estan definidos  
    //y si no existe un producto con el mismo codigo de producto
    async addProduct(product){
        
        let products = await this.getProducts()
        const {title,description,price,thumbnail,code,stock,category} = product
        if (this.productExists(product.code,products)){
            throw new Error( `(addProduct)Error el producto ${product.title} con codigo ${product.code} ya existe`);
            
        }
        
        let newProduct = {
            id : products.length , 
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnail ,
            status : true,
        }
        
        
        
        if (Object.values(newProduct).includes(undefined)){
            for (let key in newProduct){
                if (newProduct[key] === undefined){
                    if (key != "thumbnail"){
                        throw new Error(`(addProduct)Error el objeto no posee el campo ${key}`)
                    }
                    else{
                        newProduct.thumbnail = []
                    }
                }
            }
            
            
        }
        products.push(newProduct);
        await fs.promises.writeFile(this.path,JSON.stringify(products,null,4));
        return newProduct;
    }
    //lee el archivo y devuelve un array con una lista de productos
    async getProducts(){
        let jsondata = await fs.promises.readFile(this.path,"utf-8");
        let products = JSON.parse(jsondata) || []
        //console.log(this.products);
        return products;
    }
    //chequea si el codigo de producto ya existe en el array products
    productExists(codeBuscado,products){
        
        return products.find((element) => element.code === codeBuscado);
    }
    //lee el archivo y devuelve el producto en formato objeto con id idbuscado
    async getProductById( idBuscado){
        
        let products = await this.getProducts();
        let p = products.find((element) => element.id === idBuscado);
        if (!p)
            throw new Error(`(getProductById)Error no se encontro el producto con id ${idBuscado}`);

        return p;
    }
    //lee el archivo y actualiza el producto que se pasa como argumento
    //si este tiene todos sus campos definidos y posee el campo id 
    //y si esta id existe en un objeto en el archivo
    async updateProduct(pid,producto){
        if (Object.values(producto).includes(undefined)){
            throw new Error("(updateProduct)El producto tiene campos sin definir");
            
        }
        
        if (Object.hasOwn(producto,'id')){
            const {id , ...resto} = producto;
            producto = resto;
        }
        
        let productsList = await this.getProducts()
        let index = productsList.findIndex((p) => p.id === pid);
        
        if (index === -1) {
            throw new Error(`(updateProduct)Error no se encontro el producto ${producto.title} con id ${pid}`);
             
        }
        productsList[index] = {
            ...productsList[index],
            ...producto
        }

        await fs.promises.writeFile(this.path,JSON.stringify(productsList,null,4));
        return productsList[index];
    }
    //lee el archivo y borra el producto con idProducto que se pasa como argunmento
    //si el idProducto existe en los objetos del archivo
    async deleteProduct(idProducto){
        let productList = await this.getProducts();
        let index = productList.findIndex((p) => p.id === idProducto);
        if (index === -1) {
            throw new Error(`(deleteProduct)Error no se puede borrar el producto con id ${idProducto}`);
             
        }
        productList = productList.filter((item) => item.id !== idProducto)
        
        await fs.promises.writeFile(this.path,JSON.stringify(productList,null,4));
    }
}

export default ProductManager






