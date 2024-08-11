const JWT_SECRET=require("./config");
const jwt=require("jsonwebtoken");
const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    const str=authHeader.split(' ');
    if(str[0]!="Bearer"){
        res.status(401).json({});
    }
    const token=str[1];
    try{
        const decode=jwt.verify(token,JWT_SECRET);
        if(decode._id){
            req.userId=decode._id;
        }
        next();
    }
    catch(err){
       return  res.status(403).json({});
    }
}
module.exports=authMiddleware;