import { users,TravelHistory } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

export const Register=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        if(!name||!email||!password){
            return res.status(400).json({message:"bad request"})
        }
        const salt_rounds=11;
        const hashedpass=await  bcrypt.hash(password,salt_rounds)
        const newuser={
            Name:name,
            Email:email,
            Password:hashedpass
        }
        await users.create(newuser);
        res.status(201).json({message:"user registered",data:newuser})

    }
    catch(err){
      res.status(500).json({message:"Internal server error", error:err.message})
    }
}

export const Login=async (req,res)=>{
    const {email,password}=req.body;
    try{
      const data= await users.findOne({email});
      const iscorrectpass= await bcrypt.compare(password,data.Password)
      if(!iscorrectpass){
          return res.status(401).json({message:"user email or password is wrong"})
      }
      const token =jwt.sign({id:data._id,name:data.Name},process.env.Secret_Key)
      res.status(200).json({message:"Login success",token:token})
    }
    catch(err){
      res.status(500).json({message:"Internal server error"})
    }
}

export const save_travel_history=async(req,res)=>{
  const {destination_name,strt_date,end_date}=req.body;
  const token=req.headers["Authentication"];
  if(!token){
    res.status(401).json({message:"unauthorized"})
  }
  try{
    const decoded=await token.verify(token,process.env.Secret_Key)
    const userid=decoded.id;
    
    const newdata={
     
    }

  }catch(err){

  }
}
export const get_travel_history=async(req,res)=>{

}