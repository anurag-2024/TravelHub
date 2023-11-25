import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

export const register = async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: password,
            profile: req.body.file
        });
        const user = await newUser.save();
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body; 
        await User.findOne({ email })
            .then(async (user) => {
                await bcrypt.compare(password, user.password)
                    .then((passwordCheck) => {
                        if (!passwordCheck) {
                            return res.status(400).json({message:"Invalid Credentials"});
                        }
                        const {password,role,...rest}=user._doc;
                        const token = jwt.sign({
                            userId: user._id,
                            email: user.email,
                            role: user.role
                        }, process.env.REACT_APP_JWT_SECRET, { expiresIn: "10d" });

                        res.status(200).cookie("accessToken", token, {
                            httpOnly: true,
                            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                        }).json({
                            success: true,
                            message: "User logged in successfully",
                            data: {...rest},
                            token,
                            role
                        })
                    })
                    .catch((err)=>{
                        return res.status(404).send(err.message);
                    })
            })
            .catch((err) => {
                return res.status(404).json({message:"User not found"});
            })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}
export const verifyEmail = async (req,res,next) => {
   try{
    const decodedEmail = decodeURIComponent(req.query.email);
      const user=await User.findOne({email:decodedEmail});
        if(!user){
            return res.status(404).send({
                message:"User not found"
            })
        }
        next();
   }
   catch(err){
    res.status(500).json({ message: err.message })
   }
}
export function localVariables(req,res,next){
    req.app.locals={
      OTP:null,
      resetSession:false
    }
    next();
}
export async function generateOTP(req, res) {
    req.app.locals.OTP= otpGenerator.generate(6, {specialChars: false, lowerCaseAlphabets: false,upperCaseAlphabets:false});
    res.status(201).send({code:req.app.locals.OTP});
}

export async function verifyOTP(req, res) {
    const {code}=req.query;
    if(parseInt(code)===parseInt(req.app.locals.OTP)){
        req.app.locals.OTP=null;
        req.app.locals.resetSession=true;
        return res.status(200).send({message:"OTP Verified"});
    }
    return res.status(400).send({error:"Invalid OTP"});
}

export async function createResetSession(req, res) {
    if(req.app.locals.resetSession){
        return res.status(201).send({flag:req.app.locals.resetSession});
    }
    return res.status(400).send({error:"Session expired"});
}

export async function resetPassword(req, res) {
    try{
        if(!req.app.locals.resetSession) return res.status(400).send({error:"Session expired"});
        const email=req.body.email;
        const password=req.body.password;
        console.log(email,password);
        try{
            console.log("hiii");
            const decodedEmail = decodeURIComponent(email);
            console.log("decode",decodedEmail);
             User.findOne({email:decodedEmail})
             .then(user=>{
                 bcrypt.hash(password,10)
                 .then(hashedPassword=>{
                    User.updateOne({email:user.email},{password:hashedPassword})
                    .then(user=>{
                        req.app.locals.resetSession=false;
                        return res.status(200).send(user);
                    })
                    .catch(err=>{
                        return res.status(400).send(err.message);
                    })
                 })
                 .catch(err=>{
                    return res.status(500).send(err.message);
                 })
             })
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    catch(err){
        return res.status(401).send(err.message);
    }
}