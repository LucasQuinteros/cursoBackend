import express from "express";
import router from "./routes/index.js";

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true}));


app.use("/api",router);


app.listen(PORT,() => (console.log(`Server listen on port ${PORT}`)))