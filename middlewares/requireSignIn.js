const AppError = require("../utils/AppError");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const requireSignIn = async(req,res,next)=>{
    const {authorization} = req.headers;
    let token;
    if(authorization && authorization.startsWith('Bearer')){
        token = authorization.split(' ')[1];
    }
    if(!token){
        return next(new AppError('Token is required',400));
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    //console.log('dec',decoded)
    if(!decoded){
        return next(new AppError('Invalid token',400));
    }
    const user = await User.findById(decoded._id);
    req.currentUser = user;
    next();
}

module.exports = requireSignIn;