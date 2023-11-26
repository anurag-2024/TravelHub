import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './database/connect.js';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import tourRouter from './router/tourRoutes.js';
import userRouter from './router/userRoutes.js';
import authRouter from './router/authRoutes.js';
import reviewRouter from './router/reviewRoutes.js';
import bookingRouter from './router/bookingRoutes.js';
import EventEmitter from 'events';

const myEmitter = new EventEmitter();

function myListener() {
    console.log('Some event occurred');
}
myEmitter.on('someEvent', myListener);
myEmitter.off('someEvent', myListener);
dotenv.config();
const port=5500;
const app=express();
app.use(express.json());
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(
    {
        origin:["https://travel-hub-ruddy.vercel.app"],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    }
));


app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use("/api",tourRouter);
app.use("/api",userRouter);
app.use("/api",authRouter);
app.use("/api",reviewRouter);
app.use("/api",bookingRouter);
connect()
.then(()=>{
     try{
        app.listen(port, () => {
            console.log("Server is running on " + port);
        });
     }
     catch(err){
        console.log("Cannot connect to Server");
     }
})
.catch((err)=>{
    console.log("Invalid database connection");
})  