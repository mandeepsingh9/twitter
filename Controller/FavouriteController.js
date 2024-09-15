const Favorite=require("../Models/FavoriteModel.js")

const createFavController=async(req,res)=>{

  
    try {
       const obj=req.body
      console.log(obj);
       let fav = await Favorite.findOne({ contactId: obj.contactId});
       console.log(fav);
  
      if(!fav)
      {
         fav=new Favorite({
           favorite:true,
           contactId:obj.contactId
         })
      
      }
      else
      {  
          fav.favorite=!fav.favorite
      }
      await fav.save();
      
      res.json({
       "status":"201",
       "message":"sucess",
       "Data":fav
    });    
    } catch (error) {
     res.json(
       {
          "status":"404",
          "message":"Something went wrong",
          "error":error
       })     
    }
   
 }

const  getAllFavController=async(req,res)=>{
    try {
        const getallfav=await Favorite.find();
        res.json({
            "status":"201",
            "message":"sucess",
            "Data":getallfav
         });    
    } catch (error) {
        res.json(
            {
               "status":"404",
               "message":"Something went wrong",
               "error":error
            }) 
    }
}
module.exports={createFavController,getAllFavController}