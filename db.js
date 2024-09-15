const mongoose=require("mongoose");
require("dotenv").config();
const connect=async()=>{
    try {
        await mongoose.connect(`mongodb+srv://nishagupta14:${process.env.Db_Password}@cluster0.jm67guo.mongodb.net/twitter`)
       console.log("mongoDb Connected");
    } catch (error) {
        console.log("mongoDb Connection failed",error);
        
    }

}
module.exports=connect