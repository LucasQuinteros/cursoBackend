class ProductManager{
    constructor(){
        this.products = [];
    }
    //metodo de la clase que agrega un producto si este no existe y todos sus campos estan definidos
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
    //devuelve los productos que se crearon
    getProducts(){
        console.log(this.products);
        return this.products;
    }
    //chequea si el codigo de producto ya existe
    productExists(codeBuscado){
        return this.products.find((element) => element.code === codeBuscado);
    }
    //devuelve el producto con id idbuscado
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
