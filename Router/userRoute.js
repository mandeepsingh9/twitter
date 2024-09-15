const express=require("express")
const {getAllUser,CreateTweet, deleteTweets,LoginController,getUserDetails}=require("../Controller/UserController.js")
const {handleCallback} =require("../Controller/OuthTwitterController.js")
const Route=express.Router()

Route.get("/user",getAllUser)
Route.post("/user/create",CreateTweet)
Route.get("/login",LoginController)
Route.delete("/tweets/:id",deleteTweets)
Route.get('/callback', handleCallback);
Route.get("/userdetail",getUserDetails)
module.exports=Route