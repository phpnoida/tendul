const AppError = require("../utils/AppError")
const accessAllowed = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.currentUser.role)){
            return next(new AppError('Access Denied',403))
        }
        next();
    }
}

module.exports = accessAllowed;