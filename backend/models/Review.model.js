import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
    },
    userId:{
      type:mongoose.Types.ObjectId,
      ref:"User" 
    },
    username: {
      type: String,
      required:[true,"Username is required"],
    },
    reviewText: {
      type: String,
      required: [true, "Review is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);
const Review=mongoose.model("Review",reviewSchema);
export default Review;
