import axios from "axios"; 
import { destination } from "../model/Destination.model.js";

export const getdestination= async (req, res) => {
    try {
      const place = req.params.place;
      if (!place) return res.status(400).json({ error: "Place name is required" });
      const accessKey = process.env.suraj_unsplash_Access_key;
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query: place, per_page: 5, client_id: accessKey },
      });
      const images = response.data.results.map((image) => ({
        url: image.urls.regular,
      }));
      
      const data= await destination.findOne({DestinationName:place})
      
      const destinationdetails={
            img_url:images[0].url,
            Destination:data.DestinationName,
            Description:data.Description,
            Attractions:images,
            Hotels:data.Hotels
      }
      res.status(200).json(destinationdetails);
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({ error: "Failed to fetch images" });
    }
  };

//   export const destnames=async(req,res)=>{
//     try{


//         const destdata=await destination.find();
//         const data={
//             img_url:images[0].url,
//             Destination:data.DestinationName,
//         }
//     }
//   }