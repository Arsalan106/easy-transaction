const express=require("express");
const app=express();
const cors=require("cors");
app.use(express.json());
require("./db")
const mainRouter=require('./Routers/index')
const port=3000;
//all request that are coming to api/v1 should go to userRouter 
app.use("/api/v1",mainRouter)
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
//our request will look like /api/v1/user/signup, /api/v1/user/transaction,


//