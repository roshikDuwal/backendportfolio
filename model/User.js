import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: [true, "Please Enter Email"],
    },
    password: {
        type:String,
        select:false,
        required:[true,"Please enter password"]
    },

    projects: [
        {
            url: String,
            title: String,
            image: {
                public_id: String,
                url: String
            },
            description: String,
            techStack: String
        }
    ],

    about:{
        description: String,
        phonenumber: String,
        email: String,
        avatar:{
            public_id:String,
            url:String
        }
    }

})


export const User = mongoose.model("User", userSchema)