const User = require("../Models/UserModel");

const crypto = require('crypto');


require("dotenv").config();

const CLIENT_ID =process.env.CLIENT_ID;
const REDIRECT_URI =process.env.REDIRECT_URI;
const AUTHORIZATION_URL = process.env.AUTHORIZATION_URL;


function generateCodeVerifier(length = 128) {
   return crypto.randomBytes(length).toString('base64url');
}


function generateCodeChallenge(codeVerifier) {
   return crypto.createHash('sha256').update(codeVerifier).digest('base64url');
}


const generateRandomState = () => crypto.randomBytes(16).toString('hex');

const LoginController=(req,res)=>{
   const codeVerifier = generateCodeVerifier();
   const codeChallenge = generateCodeChallenge(codeVerifier);

   req.session.codeVerifier = codeVerifier;
   const state = generateRandomState();
   req.session.state = state; 

   const authorizationUrl = `${AUTHORIZATION_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=tweet.read%20tweet.write%20users.read&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

  

   res.json({authorizationUrl});
   
}




const  getAllUser =async(req,res)=>{

     try {
         const getAlldata= await User.find();
         res.status(201).json({
            "status":"201",
            "message":"sucess",
            "Data":getAlldata
         });        
     } catch (error) {
        res.status(404).json(
         {
            "status":"404",
            "message":"Something went wrong",
            "error":error
         }
        )
     }
    
}

const CreateTweet=async(req,res)=>{
   
   try {
    const data= req.body;
   //  const createddata= await User.create(data);
    res.json({
       "status":"201",
       "message":"sucessfully Created",
       "Data":""   });        
} catch (error) {
   res.json(
    {
       "status":"404",
       "message":"Something went wrong",
       "error":error
    }
   )
}
  
}

const getUserDetails=async(req,res)=>{
   try {
      
   } catch (error) {
      res.json(
         {
            "status":"404",
            "message":"Something went wrong",
            "error":error
         })
      
   }
}

const deleteTweets=async(req,res)=>{
    
   try {
     const id=req.params.id;
     console.log(id);
   //   const deletedData= await User.findByIdAndDelete(id,{new:true})
     console.log(deletedData);
     res.json({
        "status":"201",
        "message":"Delete sucessfully ",
        "Data":""  });   
  
    }
     catch (error) {
    res.json(
        {
           "status":"404",
           "message":"Something went wrong",
           "error":error
        }
       )
   }
 }
 



module.exports={getAllUser,CreateTweet,deleteTweets,LoginController, getUserDetails}