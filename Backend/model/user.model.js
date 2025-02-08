import {Schema, model} from "mongoose";

const userSchema= new Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String
    },
    Password:{
        type:String,
        min:3
    }
 })

 const users=model("user",userSchema)

 const TravelHistorySchema= new Schema({
    userid:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    destination_img_url:String,
    destination_name:String,
    start_date:Date,
    end_date:Date,

})

const TravelHistory=model("Travel_history",TravelHistorySchema)

 export {users,TravelHistory}