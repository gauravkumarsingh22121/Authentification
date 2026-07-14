import express from "express"

import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js"
import authRouter from "./routes/routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"


let app =express();
let port= process.env.PORT || 4000


app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(cookieParser())
app.use("/api",authRouter)
app.listen(port,()=>{
    console.log("Server is started",port)
    connectDB();
})