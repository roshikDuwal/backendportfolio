import mongoose  from "mongoose";

export const dbconnect=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"protfolioapi"
    }).then((c)=>console.log(`Database Connected with ${c.connection.host}`)).catch((error)=>{
        console.log(error);
    })
}