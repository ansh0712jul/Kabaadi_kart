import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// create an epress app
const app = express();

// other middlewares setup 

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"

}))
app.use(express.static("public"));
app.use(cookieParser())

// import routes using import 



// routes declaration 



export default app