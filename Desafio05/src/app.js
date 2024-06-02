import express from "express";
import router from "./routes/index.js";
import Database from "./config/mongoDb.config.js";
import session from 'express-session'
import MongoStore from 'connect-mongo'

const PORT = 8080;
const urlDb = 'mongodb+srv://lucasquinteros:cascadas@ecommerce.a8f2glv.mongodb.net/ecommerce'
const app = express();
const db = new Database(urlDb)

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(session({
    store: MongoStore.create({
        mongoUrl: urlDb,
        ttl : 15
    }),
    secret : "secretKey",
    resave: true,
    saveUninitialized: true
}))

app.use("/api",router);


app.listen(PORT,() => (console.log(`Server listen on port ${PORT}`)))