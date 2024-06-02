require('dotenv').config()
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async(req,res ,next)=>{
    let token;
    
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
          token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        
    }catch(err){
        console.error(err);
            res.status(401).json({
                message:'Not authorized, token failed'
            });
            ;
    }
}
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
}

exports.admin = async (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            res.status(401);
            throw new Error('Not authorized as an admin');
        }
    } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};