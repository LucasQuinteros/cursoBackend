import express from "express";
import router from "./routes/index.js";
import Database from "./config/mongoDb.config.js";
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from "cookie-parser";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import envs from './config/env.config.js'
import cors from 'cors'



const app = express();
const db = new Database(envs.MONGO_URL)

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cookieParser("secreto"));
app.use(session({
    store: MongoStore.create({
        mongoUrl: envs.MONGO_URL,
        ttl : 15
    }),
    secret : envs.CODE_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
initializePassport()
app.use(cors())
app.use("/api",router);


app.listen(envs.PORT,() => (console.log(`Server listen on port ${envs.PORT}`)))