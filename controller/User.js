import { sendMail } from "../middleware/sendMail.js"
import { User } from "../model/User.js"
import jwt from "jsonwebtoken"
import cloudinary from "cloudinary"


export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email, password })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 15*60*1000),
            httpOnly: true,
            sameSite:process.env.NODE_ENV==="Development"? "lax":none,
            secure:process.env.NODE_ENV==="Development"?false:true,
        }).json({
            success: true,
            message: "Login Successfully"
        })

    } catch (error){
        return res.status(400).json({
            success: false,
            message:error.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite:process.env.NODE_ENV==="Development"? "lax":none,
            secure:process.env.NODE_ENV==="Development"?false:true,
        }).json({
            success: true,
            message: "LogOut Successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const contact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const userMessage = `Hey I am ${name}. My email is ${email}.My message is ${message}`

        await sendMail(userMessage)

        return res.json({
            success: true,
            message: "Message Sent Successfully"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findOne().select("-password -email");
        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            success: true,
        
            user
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const { name, email, password, about } = req.body;

    
        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        if (password) {
            user.password = password;
        }
   
        if (about) {
            
            if(about.description){
                user.about.description = about.description;
            }
            
            if(about.phonenumber){
                user.about.phonenumber = about.phonenumber;
            }

            if(about.email){
                user.about.email = about.email;
            }
            
            if (about.avatar) {
                await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);
          

                const myCloud = await cloudinary.v2.uploader.upload(about.avatar, ({
                    folder: "portfolio"
                }));

                user.about.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }
        }

        await user.save()

        res.status(200).json({
            success: true,
            message:"Updated successfully",
            user,
        })

    } catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message:"Cannot Update the file"
        })
    }
}

export const addProject = async (req, res) => {
    try {
        const { url, title, image, description, techStack } = req.body;


        const user = await User.findById(req.user._id)

        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "portfolio"
        });
        user.projects.unshift({
            url,
            title,
            description,
            techStack,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        })

        await user.save();

        res.status(200).json({
            success: true,
            message: "Project Added successfully"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message:error.message
        })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(req.user._id);

      console.log(user);
        const project = user.projects.find((item) => item._id == id)

        console.log(project);
        await cloudinary.v2.uploader.destroy(project.image.public_id);
        user.projects = user.projects.filter((item) => item._id != id)

        await user.save();

        res.status(200).json({
            success: true,
            message: "Project Deleted successfully "
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}



