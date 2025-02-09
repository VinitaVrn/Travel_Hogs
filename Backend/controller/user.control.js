import { users,TravelHistory } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
import axios from "axios"

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
      const data= await users.findOne({Email:email});
      const iscorrectpass= await bcrypt.compare(password,data.Password)
      if(!iscorrectpass){
          return res.status(401).json({message:"user email or password is wrong"})
      }
      const token =jwt.sign({id:data._id,name:data.Name},process.env.Secret_key)
      res.status(200).json({message:"Login success",token:token})
    }
    catch(err){
      res.status(500).json({message:"Internal server error",error:err.message})
    }
}

export const save_travel_history = async (req, res) => {
  const { destination_name, start_date, end_date } = req.body;

  try {
    const userid = req.userid;
    if (!userid) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const accessKey = process.env.suraj_unsplash_Access_key;
    if (!accessKey) {
      return res.status(500).json({ message: "Unsplash Access Key is missing" });
    }

    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: destination_name, per_page: 1, client_id: accessKey },
    });

    const images = response.data.results.map((image) => ({
      url: image.urls.regular,
    }));

    const destination_img_url = images.length > 0 ? images[0].url : null;

    const newdata = {
      userid,
      destination_img_url,
      destination_name,
      start_date,
      end_date,
    };

    await TravelHistory.create(newdata);
    res.status(200).json({ message: "Data saved" });

  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const get_travel_history=async(req,res)=>{
  
  try{
    const userid=req.userid;
    const data= await TravelHistory.findOne({userid:userid})
    console.log(data)
    if(!data){
      return res.status(404).json({message:"user doesnot exists"})
    }
    res.status(200).send(data)
  }
  catch(err){
    return res.status(500).json({message:"Internal server error",error:err.message})
  }
}