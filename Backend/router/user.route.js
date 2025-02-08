import {Router} from "express";
import { Register,Login } from "../controller/user.control.js";
const userRoute=Router();

userRoute.post("/signup",Register)
userRoute.post("/login",Login);

export {userRoute}