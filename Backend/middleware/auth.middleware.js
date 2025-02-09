
import dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken";

export const Authentication=async(req,res,next)=>{
    const token=req.headers["authorization"];
  if(!token){
    return res.status(401).json({message:"unauthorized"})
  }
  try{
    const decoded=jwt.verify(token,process.env.Secret_key)
    req.userid=decoded.id;
    next();
  }catch(err){
    res.status(500).json({message:"Unauthorized",error:err.message})
  }
}