import express from "express"
import { addProject, contact, deleteProject, getUser, login, logout, myProfile, updateUser } from "../controller/User.js";
import {isAuthenticated} from "../middleware/auth.js"

export const UserRouter = express.Router()

UserRouter.route("/login").post(login);
UserRouter.route("/logout").get(logout);

UserRouter.route("/user").get(getUser);

UserRouter.route("/contact").post(contact)

UserRouter.route("/me").get(isAuthenticated,myProfile);

UserRouter.route("/admin/update").put(isAuthenticated,updateUser);

UserRouter.route("/admin/project/add").post(isAuthenticated,addProject);

UserRouter.route("/admin/project/:id").delete(isAuthenticated,deleteProject);


