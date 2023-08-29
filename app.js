import cookieParser from "cookie-parser"
import express from "express"

import {UserRouter} from "./routes/User.js"
import cors from "cors"


export const app = express()

import dotenv from "dotenv"
dotenv.config({
    path:"./config/config.env"
})



app.use(express.json({limit:"50mb"}))
//to limit the size of photo ,video
app.use(express.urlencoded({extended:true,limit:"50mb"}))

app.use(cookieParser())

console.log(process.env.FRONTEND_URL);

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use("/api/v1",UserRouter)
