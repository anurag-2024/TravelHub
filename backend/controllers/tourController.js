import Tour from "../models/Tour.model.js";

export const createTour=async(req, res)=>{
    const newTour= new Tour(req.body);
    try{
        const savedTour=await newTour.save();
        return res.status(201).json({
            success:true,
            message:"Tour created successfully",
            data:savedTour
        })
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

export const updateTour=async(req, res)=>{
    try{
        const tourId=req.params.id;
        const data=req.body;   
        const tour=Tour.findOne({_id:tourId});
        if(!tour){
            return res.status(404).json({
                message:"Tour not found"
            })
        }
        try{
           Tour.updateOne({_id:tourId},data,{new:true})
           .then((tour)=>{
               return res.status(200).json({
                   success:true,
                   message:"Tour updated successfully",
                   data:tour
               })
           })
           .catch((err)=>{
               return res.status(500).json({
                   message:err.message
               })
           })
        }
        catch(err){
            return res.status(500).json({
                message:err.message
            })
        }
    }
    catch(err){
       res.status(500).json({
           message:err.message
       })
    }
}

export const getTour=async(req, res)=>{
    try{
      const tour=await Tour.findOne({_id:req.params.id}).populate("reviews");
      if(!tour){
          return res.status(404).json({
              message:"Tour not found"
          })
      }
        res.status(200).json({
            success:true,
            message:"Tour found",
            data:tour
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
export const getAllTours=async(req, res)=>{
    const page=parseInt(req.query.page);
    try{
       const tours=await Tour.find().populate("reviews")
       .skip(page*8).limit(8);
       if(!tours){
           return res.status(404).json({
               message:"Tours not found"
           })
       }
       res.status(200).json({
        success:true,
        count:tours.length,
        message:"Successful",
        tours:tours
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
export const deleteTour=async(req, res)=>{
    try{
       const tour= await Tour.deleteOne({_id:req.params.id});
         if(!tour){
              return res.status(404).json({
                message:"Tour not found"
              })
         }
         res.status(200).json({
            message:"Tour deleted successfully"
         })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

export const getTourBySearch=async(req, res)=>{
    const city= new RegExp(req.query.city,'i');
    const distance=parseInt(req.query.distance);
    const maxGroupSize=parseInt(req.query.maxGroupSize);
    try{
       const tours=await Tour.find({city:city,distance:{$gte:distance},maxGroupSize:{$gte:maxGroupSize}}).populate("reviews");
       if(tours.length===0){
           return res.status(404).json({
               message:"Tours not found",
           })
       }
         res.status(200).json({
          success:true,
          message:"Successful",
          tours:tours
          });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

export const getFeaturedTours=async(req,res)=>{
    try{
       const tours=await Tour.find({isFeatured:true}).limit(8).populate("reviews");
       if(tours.length===0){
           return res.status(404).json({
               message:"Tours not found"
           })
       }
         res.status(200).json({
          success:true,
          message:"Successful",
          tours:tours
          });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

export const getTourCount=async(req,res)=>{
    try{
        const touCount=await Tour.estimatedDocumentCount();
        res.status(200).json({
            success:true,
            message:"Successful",
            count:touCount
        })
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}