import { fakerES as faker } from "@faker-js/faker"
import productModel from "../persistences/mongo/models/product.model.js"


export const generateProductMocks = (amount) => {
    const products = [];

    for (let i = 0;i < amount;i++){
        const product = {
            title : faker.commerce.product(),
            description : faker.commerce.productDescription(),
            price : faker.commerce.price(),
            thumbnail : faker.image.url(),
            code : faker.commerce.isbn(),
            stock : faker.number.int(100),
            category : faker.commerce.department(),
            status: faker.datatype.boolean(),
        }
        products.push(product)
        productModel.insertMany(products)
    }
    return products
}