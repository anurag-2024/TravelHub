import Tour from "../models/Tour.model.js";
import Review from "../models/Review.model.js";

export const createReview = async (req, res) => {
    const tourId = req.params.tourId;
    const newReview = new Review({...req.body});

    try{
        const savedReview=await newReview.save();
        await Tour.updateOne({_id:tourId},{$push:{reviews:savedReview._id}});
        return res.status(201).json({
            success:true,
            message:"Review created successfully",
            data:savedReview
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}