const mongoose=require("mongoose");

const contactSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Required"],
        unique:[true,"Name Aldready Exists"]
    },
    userName:{
        type:String,
        required:[true,"username is Required"],
        
    },
    userId:{
        type:String,
        required:[true,"userId is required"],
        unique:[true,"UserId Aldready Exists"]
    },
    
    
});


const User=mongoose.model("user",contactSchema)
module.exports=User