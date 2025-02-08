import {Schema, model} from "mongoose";

const destinationSchema= new Schema({
    destination_img_url:{
        Type:String
    },
    DestinationName:{
        type:String,
        required:true
    },
    Description:String,
    Hotels: [
        {
            hotelName: { type: String, required: true }, 
            address: { type: String }, 
            pricePerNight: { type: Number }, 
            image: { type: String }, 
            reviews: [
                {
                    user: { type: String }, 
                    rating: { type: Number, min: 1, max: 5 }, 
                    comment: { type: String } 
                }
            ]
        }
    ]
})

const destination=model("destination",destinationSchema)
export {destination}
