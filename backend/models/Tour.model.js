import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    distance: {
      type: Number,
      required: [true, "Distance is required"],
    },
    photo: {
      type: String,
      required: [true, "Photo is required"],
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "Group Size is required"],
    },

    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
