const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const Cart = require('./../models/cart');

exports.addItems = catchAsync(async(req,res,next)=>{
    console.log('from addcart.');
    const userId = req.currentUser._id;
    const isUser = await Cart.findOne({
        userId:userId
    });
    if(isUser){
        const isProductAdded = isUser.cartItems.find((el)=>{
            return el.productId == req.body.cartItems[0].productId
        })
        if(isProductAdded){
            //means update quantity 

          await Cart.updateOne({
                "cartItems":{$elemMatch:{productId:req.body.cartItems[0].productId}}
            },{
                $set:{
                    "cartItems.$":{
                        productId:req.body.cartItems[0].productId,
                        quantity:req.body.cartItems[0].quantity
                    
                    }
                }
            })
            console.log('abc',t);
        return res.status(200).json({
            status:'success',
            message:'Quantity updated'
        })
        }else{
             //means push new product
             await Cart.updateMany({
                 userId:userId
             },{
                 $push:{
                     "cartItems":req.body.cartItems
                 }
             },{new:true,upsert:true})
            return res.status(200).json({
                 status:'success',
                 message:'Cart Added/Updated'
             })
        }

    }
   return res.status(201).json({
        status:'success',
        message:'Added To Cart'
    })
    
});

exports.getCart = catchAsync(async(req,res,next)=>{
    console.log('from get cart')
    const userId = req.currentUser._id;
    const resData = await Cart.findOne({
        userId:userId
    });
    res.status(200).json({
        status:'success',
        cartLenght:resData.cartItems.length,
        data:resData
    })
})