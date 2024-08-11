const express = require("express");
const { z } = require("zod");
const router = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const authMiddleware = require("../middleware");
router.get('/', async (req, res) => {
    res.json({
        msg: "hello how are u i am under the water"
    })
})
// define the schema for user
const userSchema = z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
})
router.post('/signup', async (req, res) => {
    //get the user data form the body
    const body = req.body;

    const { success } = userSchema.safeParse(req.body);
    //check user schema
    if (!success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username,
    })
    //check for existing user
    if (existingUser) {
        return res.status(411).json({
            message: "user already exist"
        })
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body, lastName
    })
    const user_ID = user._id;
    const token = jwt.sign({
        user_ID,
    }, secret)
    res.status(200).json({
        message: "User created succesfully",
        token: token,
    })
})
const singinBody = z.object({
    username: z.string(),
    password: z.string()
})
router.post('signin',authMiddleware, async (req, res) => {
    const { success } = singinBody.safeParse(req.body);
    if (!success) {
        return res.status(401).json({
            message: "invalid inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
 })
    if(user){
        const user_id=user._id;
        const token=jwt.sign({
            user_id,
        },secret)
        res.status(200).json({
            token:token,
        })
        return;
    }
    res.status(401).json({
        message:"Error while logging in",
    })
    
})
//route to update the user database;
const updateBody=z.object({
    password:z.string(),
    firstName:z.string(),
    lastName:z.string()
})
router.put('/',authMiddleware,async (res,req)=>{
    const {success}=updateBody.safeParse(req.body);
    if(!success){
        return res.status(401).json({
            message:"invalid inputs"
        })
    }
    await User.updateOne(req.body,{
        id:req.userId,
    })
    res.json({
        messsage:"user updated successfully"
    })
})
//router for like queries to get all user having match of small string
router.get('/bulk',async(req,res)=>{
    const filter=req.query.filter || "";
    const users=await User.find({
       $or:[{
        firstName:{
            "$ragex":filter
        }
       },{
        lastName:{
            "$ragex":filter
        }
       }]
    })
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})
module.exports = router;