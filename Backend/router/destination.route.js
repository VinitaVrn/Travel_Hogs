import {Router} from "express";
import { getdestination } from "../controller/destination.control.js";

const destRouter=Router();

destRouter.get("/alldetails/:place",getdestination)

export {destRouter}