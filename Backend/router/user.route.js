import {Router} from "express";
import { Register,Login,save_travel_history,get_travel_history } from "../controller/user.control.js";
import { Authentication } from "../middleware/auth.middleware.js";

const userRoute=Router();

userRoute.post("/signup",Register)
userRoute.post("/login",Login);

userRoute.use(Authentication)
userRoute.post("/postdetails",save_travel_history)
userRoute.get("/getdetails",get_travel_history)

export {userRoute}