import {app} from "./app.js"

import {dbconnect} from "./config/database.js"
import cloudinary from "cloudinary"


dbconnect();



cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port:${process.env.PORT} in ${process.env.NODE_ENV}`);
})