exports.addItemCart = catchAsync(async(req,res,next)=>{
    console.log('addItems cart');
    const userId = req.currentUser._id;
    req.body.userId = userId;
    const isUser = await Cart.findOne({
        userId:userId
    });
    if(isUser){
        //if cart exists then update it
        const isItemAdded = isUser.cartItems.find((item)=>{
           
            return item.productId == req.body.cartItems.productId
        })
        if(isItemAdded){
            await Cart.updateOne({
             $and:[
                 {userId:userId},
                 {"cartItems":{$elemMatch:{productId:req.body.cartItems.productId}}}
                ]
         },{
             $set:{
                 "cartItems.$":req.body.cartItems
             }
         })
         res.status(200).json({
             status:'success',
             message:'updated quantity'
         })
        

        }else{
           await Cart.updateOne({
             userId:userId
         },{
             $push:{
                 "cartItems":req.body.cartItems
             }
         })
         res.status(201).json({
             status:'success',
             message:'added'
         })
        }
        

    }else{
        //means user is adding the product in cart for 1st time
        await Cart.create(req.body);
        res.status(201).json({
        status:'success',
        message:'added first time'
    })

    }
    
    
    
})