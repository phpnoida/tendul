const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'user id is must'],
        ref:'User'
    },
     cartItems:[
        {
            productId:{
              type:mongoose.Schema.Types.ObjectId,
               required:[true,'productid must'],
               ref:'Product'
            },
            quantity:{
                type:Number,
                required:[true,'quantity is must']
            }
        }
    ]
   //cartItems:Array
},{timestamps:true});

cartSchema.pre('findOne',function(next){
    this.populate({
        path:'cartItems.productId',
        select:'_id name image price'
        
        
    })
    next();
})

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;