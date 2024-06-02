// REGISTER USER
// Input: name, email, password
// If user with email exists:
//     Return error "User already exists"
// Else:
//     Create new user
//     If creation successful:
//         Return user details and token
//     Else:
//         Return error "Invalid user data"

// AUTHENTICATE USER
// Input: email, password
// Find user by email
// If user exists and password matches:
//     Return user details and token
// Else:
//     Return error "Invalid email or password"

// GET USER PROFILE
// Find user by ID from request
// If user exists:
//     Return user details
// Else:
//     Return error "User not found"

// UPDATE USER PROFILE
// Find user by ID from request
// If user exists:
//     Update user's name, email, and password if provided
//     Save updated user details
//     Return updated user details and token
// Else:
//     Return error "User not found"

const User = require('../models/User');
const bycrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.registerUser = async (req,res)=>{
    const {name , email,password,isAdmin}= req.body;
    try{
        const existsUser = await User.findOne({email});
        if(existsUser){
            return res.status(404).json({
                message:"Already Exists"
            })
        }
        const salt= await bycrypt.genSalt(10);
        const hashedpassword = await bycrypt.hash(password,salt)
        const user= new User({
            name,email,password:hashedpassword,isAdmin
        });
        await user.save();
        if(user){
            return res.status(201).json({
                _id:user.id,
                name:user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
            
            }
            else{
                return res.status(404).json({
                    messeage:"Inavlid User Input"
                })
            }
        }
        catch(err){
            return res.status(500).json({
                message:"Server error"
            })
        }
    }


exports.authUser = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const existsUser = await User.findOne({email})
        const isMatch = await bycrypt.compare(password, existsUser.password);

        if(existsUser && isMatch ){
            res.json({
                _id: existsUser._id,
                name: existsUser.name,
                email: existsUser.email,
                isAdmin: existsUser.isAdmin,
                token: generateToken(existsUser._id),
            });
        }else{
            res.status(401).json({
                message:'Invalid email or password'});
        }

    }catch(err){
        res.status(401).json({
            message:'Server error'});
    }
}

exports.getUserProfile = async(req,res)=>{
    const user= await User.findById(req.user._id);
    try{
        if(user){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,

            });
        }else{
            res.status(404).json({
                message:"User not found"
            })
        }
    }catch(err){
        res.status(404).json({
            message:'Server error'
        })
    }
}


exports.updateUserProfile = async (req,res)=>{
    const user = await User.findById(req.user._id);
    try{
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password;
            }
    }else{
        return res.status(404).json({
            message:"Not found"
        })
    }
    const updatedUser = await user.save();
    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
    });
    
}
        catch(err){
            return res.status(500).json({
                message:"Server error"
            })
        
    }
}
