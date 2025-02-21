import express from "express";
 import { signup,login,getUserProfile} from "../controller/auth.js";
 
 const authRouter = express.Router();
 
 authRouter.route("/signup").post(signup);
 
 authRouter.route('/login').post(login);
 
 authRouter.route("/profile").get(getUserProfile);
 
 export default authRouter;
 