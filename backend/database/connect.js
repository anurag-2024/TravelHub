import mongoose from "mongoose";
async function connect(){
    mongoose.set('strictQuery',true);
    const db=await mongoose.connect(process.env.REACT_APP_DATABASE_URL);
    console.log("Database Connected to the Atlas Database");
    return db;
}
export default connect;