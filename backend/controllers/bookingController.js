import Booking from "../models/Booking.model.js";
import stripe from 'stripe';

export const pendingBooking=async(req,res)=>{
    try {
        const newBooking = await Booking.create({
            userId: req.body.userId,
            tourId: req.body.tourId,
            userEmail: req.body.userEmail,
            tourName: req.body.tourName,
            fullName: req.body.fullName,
            phone: req.body.phone,
            guestSize: req.body.guestSize,
            bookAt: req.body.bookAt,
            status: 'Pending',
        });
        return res.status(201).json(newBooking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const confirmBooking=async(req,res)=>{
    try {
        const bookingId = req.params.bookingId;
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { $set: { status: 'Confirmed' } },
            { new: true }
        );
        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        return res.status(200).json(updatedBooking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const getBooking=async(req,res)=>{
    const id=req.params.id;
    try{
     const booking=await Booking.findOne({_id:id});
        if(!booking){
            return res.status(404).json({
                message:"Booking not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Booking found",
            data:booking
        })
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

export const getAllBooking=async(req,res)=>{
    try{
        const bookings=await Booking.find();
        if(!bookings){
            return res.status(404).json({
                message:"Booking not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Booking found",
            data:bookings
        })
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

export const getUserBooking=async(req,res)=>{
    try{
        const bookings=await Booking.find({userId:req.params.id});
        if(!bookings){
            return res.status(404).json({
                message:"Booking not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Booking found",
            data:bookings
        })
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
export const makePayment=async(req,res)=>{
    const stripeInstance = stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);
    try{
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:[
                {
                    price_data:{
                        currency:"inr",
                        product_data:{
                            name:"Booking",
                        },
                        unit_amount:req.body.totalAmount*100,
                    },
                    quantity:1,
                },
            ],
            mode:"payment",
            success_url:`https://travel-hub-ruddy.vercel.app/confirmBooking/${req.body.bookingId}`,
            cancel_url:"https://travel-hub-ruddy.vercel.app/failed",
        });
        res.json({id:session.id});
    }
    catch(err){
        res.status(500).json({message:err.message})
    } 
}
