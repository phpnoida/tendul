const bcrypt = require('bcrypt');
const slug = require('slug');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.signUp = catchAsync(async(req,res,next)=>{
    console.log('from registration..');
    const filterObj = {
        firstName:req.body.firstName,
        lastName:req.body.lastName||'',
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone||'',
        username:Math.random().toString()
    }
    const user = await User.create(filterObj);
    if(!user){
        return next(new AppError('user not created',400))
    }
    res.status(201).json({
        status:'success',
        message:'user created succesfully'
    })
});

exports.signIn = catchAsync(async(req,res,next)=>{
    console.log('from login');
    const {loginEmail,password} = req.body;
    const user = await User.findOne({email:loginEmail}).select('+password');
    if(!user || ! await bcrypt.compare(password,user.password)){
        return next(new AppError('Email or Password is Incorrect',400))
    }
    const token = jwt.sign({
        _id:user._id
    },process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
    //destructure data to sent 
    const {_id,firstName,lastName,role,phone,email}= user;

    res.status(200).json({
        status:'success',
        token:token,
        data:{_id,firstName,lastName,role,phone,email}
    })
})
