const express=require("express");
const router=express.Router();
const userRouter=require("./user");
const app=express();
router.use('/user', userRouter);
module.exports=router;