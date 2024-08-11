//get the mongoose library
const mongoose=require("mongoose");
const { number } = require("zod");
// connect the mongodb instance
mongoose.connect("mongodb+srv://122arsalanahmed:Arsalan123@cluster0.oalkkk5.mongodb.net/userDatabase",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected");
}).catch((error)=>{
    console.log("error");
});
//define the schema for ur database
const userSchema=new mongoose.Schema({
    username:String,
    firstName:String,
    lastName:String,
    password:String,
})
//create the user the table
const User=mongoose.model('User',userSchema);
const accountSchema=new mongoose.Schema({
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
   },
   balance:{
    type:Number,
    required:true
   }
})
const Account=mongoose.model('Account',accountSchema);
module.exports={
    User,Account
}


