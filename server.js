import {app} from "./app.js"
import dotenv from "dotenv"
import {dbconnect} from "./config/database.js"
import cloudinary from "cloudinary"


dotenv.config({
    path:"./config/config.env"
})

dbconnect();



cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})





app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port:${process.env.PORT} in ${process.env.NODE_ENV}`);
})