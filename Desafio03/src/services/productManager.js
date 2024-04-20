import { error } from 'node:console';
import fs from 'node:fs';


//JSONPATH = "./data/productos.json"

class ProductManager{
    constructor(path){
        //this.products = [];
        this.path = path
    }

    //lee el archivo en this.path y agrega un producto nuevo en este si 
    //todos los campos estan definidos y si no hay un producto con el mismo codigo
    async addProduct(title,description,price,thumbnail,code,stock){
        let products = await this.getProducts()
        
        if (this.productExists(code,products)){
            console.log( `(addProduct)Error el producto ${title} con codigo ${code} ya existe`);
            return
        }
        
        let newProduct = {
            id : products.length , 
            title,
            description ,
            price  ,
            thumbnail ,
            code,
            stock
        }
        if (Object.values(newProduct).includes(undefined)){
            console.log("(addProduct)Todos los campos son obligatorios");
            return
        }
        products.push(newProduct);
        await fs.promises.writeFile(this.path,JSON.stringify(products,null,4));
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
            console.log(`(getProductById)Error no se encontro el producto con id ${idBuscado}`);

        return p;
    }
    //lee el archivo y actualiza el producto que se pasa como argumento
    //si este tiene todos sus campos definidos y posee el campo id 
    //y si esta id existe en un objeto en el archivo
    async updateProduct(producto){
        if (Object.values(producto).includes(undefined)){
            console.log("(updateProduct)El producto tiene campos sin definir");
            return
        }
        
        if (!Object.hasOwn(producto,'id')){
            console.log("(updateProduct)El producto no tiene id");
            return
        }
        
        let productsList = await this.getProducts()
        let index = productsList.findIndex((p) => p.id === producto.id);
        
        if (index === -1) {
            console.log(`Error no se puede actualizar el producto ${producto.title} con id ${producto.id}`);
            return 
        }
        productsList[index] = {
            ...productsList[index],
            ...producto
        }

        await fs.promises.writeFile(this.path,JSON.stringify(productsList,null,4));
    }
    //lee el archivo y borra el producto con idProducto que se pasa como argunmento
    //si el idProducto existe en los objetos del archivo
    async deleteProduct(idProducto){
        let productList = await this.getProducts();
        let index = productList.findIndex((p) => p.id === idProducto);
        if (index === -1) {
            console.log(`(deleteProduct)Error no se puede borrar el producto con id ${idProducto}`);
            return 
        }
        productList = productList.filter((item) => item.id !== idProducto)
        
        await fs.promises.writeFile(this.path,JSON.stringify(productList,null,4));
    }
}

export default ProductManager






