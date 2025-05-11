const mongoose=require("mongoose");

const service= new mongoose.Schema({
  servicePic:{type:String,required:true},
  serviceName:{type:String,required:true}
})

const Service=mongoose.model("services",service);

module.exports=Service;
