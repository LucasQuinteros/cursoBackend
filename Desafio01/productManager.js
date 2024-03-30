class ProductManager{
    constructor(){
        this.products = [];
    }
    addProduct(title,description,price,thumbnail,code,stock){
        if (! this.productExists(code)){
            let newProduct = {
                id : this.products.length , 
                title,
                description ,
                price  ,
                thumbnail ,
                code,
                stock
            }
            if (Object.values(newProduct).includes(undefined)){
                console.log("Todos los campos son obligatorios");
                
            }
            else this.products.push(newProduct)
        }
        else{
            console.log( `Error el producto ${title} con codigo ${code} ya existe`)
        }
        
    }
    getProducts(){
        console.log(this.products);
        return this.products;
    }
    productExists(codeBuscado){
        return this.products.find((element) => element.code === codeBuscado);
    }
    getProductById( idBuscado){

        let p = this.products.find((element) => element.id === idBuscado);
        if (!p) p = "Error no se encontro el producto";
        console.log(p);
        return p;
    }
}

// Test
let p = new ProductManager();

p.addProduct("producto0","Este es un producto prueba",200,"Sin imagen","abc123",25)
p.addProduct("producto1","Este es un producto prueba",200,"Sin imagen","abc12")
p.getProducts()
p.getProductById(5)
