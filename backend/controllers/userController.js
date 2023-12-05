import User from '../models/User.model.js';

export const createUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: savedUser
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

export const updateUser=async(req, res)=>{
    try{
        const userId=req.params.id;
        const data=req.body;   
        const user=User.findOne({_id:userId});
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        try{
           User.updateOne({_id:userId},data,{new:true})
           .then((user)=>{
               return res.status(200).json({
                   success:true,
                   message:"User updated successfully",
                   data:user
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

export const getUser=async(req, res)=>{
    try{
      const user=await User.findOne({_id:req.params.id});
      if(!user){
          return res.status(404).json({
              message:"User not found"
          })
      }
        res.status(200).json({
            success:true,
            message:"User found",
            data:user
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

export const getAllUsers=async(req, res)=>{
    try{
        const users=await User.find();
        if(!users){
            return res.status(404).json({
                message:"Users not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Users found",
            data:users
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

export const deleteUser=async(req, res)=>{
    try{
        const userId=req.params.id;
        const user=await User.findOne({_id:userId});
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        try{
            User.deleteOne({_id:userId})
            .then(()=>{
                return res.status(200).json({
                    success:true,
                    message:"User deleted successfully"
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