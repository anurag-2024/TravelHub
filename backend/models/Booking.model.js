import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
        },
        tourId:{
            type:String, 
        },
        userEmail:{
            type:String,
        },
        tourName:{
            type:String,
        },
        fullName:{
            type:String,
            required:[true,"Full Name is required"],
        },
        guestSize:{
            type:Number,
            required:[true,"Guest Size is required"],
        },
        phone:{
            type:Number,
            required:[true,"Phone Number is required"],
        },
        bookAt:{
            type:Date,
            required:[true,"Book At is required"],
        },
        status:{
            type:String,
            default:"Pending",
        }
    },
    {timestamps:true}
)

const Booking=mongoose.model("Booking",bookingSchema);
export default Booking;