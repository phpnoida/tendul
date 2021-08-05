const {check,body,validationResult} = require('express-validator');
const User = require('../models/user');

exports.validateSignUp = [
        body('firstName').matches(/^[a-zA-Z]{3,}$/,'i').withMessage('Invalid first Name'),
        body('lastName').matches(/^[a-zA-Z ]{3,}$/,'i').optional({checkFalsy:true}).withMessage('invalid last name'),
        body('phone').isMobilePhone().optional({checkFalsy:true}).withMessage('Invalid Mobile'),
        body('email').isEmail().withMessage('Invalid Email').
                  custom(async(val,{req})=>{
                      const user = await User.findOne({email:val}).exec();
                      if(user){
                           throw new Error('Email Already Taken..')
                      }
                      return true;

                  }).normalizeEmail()
    ]


exports.validateSignIn = [
            body('loginEmail').isEmail().withMessage('invalid email'),
            body('password').notEmpty().withMessage('password is must')
]


exports.isValidated = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err)=>{
         extractedErrors.push({
            [err.param]:err.msg
        })
    });
   return res.status(422).json({
        status:'fail',
        errors:extractedErrors
    })
}