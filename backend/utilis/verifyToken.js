import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
        const token=req?.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            success:"false",
            message: "You are not authorized"
        })
    }
    jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Token is not valid"
            })
        }
        req.user = decoded;
        next();
    })
}

export const verifyUser=(req, res, next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id||req.user.role==="admin"){
            next();
        }
        else{
            return res.status(403).json({
                message:"You are not authenticated"
            })
        }
    })
}

export const verifyAdmin=(req, res, next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.role==="admin"){
            next();
        }
        else{
            return res.status(403).json({
                message:"You are not authunticated"
            })
        }
    })
}