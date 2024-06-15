import express from "express";
import router from "./routes/index.js";
import Database from "./config/mongoDb.config.js";


const PORT = 8080;
const urlDb = 'mongodb+srv://lucasquinteros:cascadas@ecommerce.a8f2glv.mongodb.net/ecommerce'
const app = express();
const db = new Database(urlDb)

app.use(express.json());
app.use(express.urlencoded({ extended : true}));


app.use("/api",router);


app.listen(PORT,() => (console.log(`Server listen on port ${PORT}`)))