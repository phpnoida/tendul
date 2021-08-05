const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name must']
        
    },
    desc:{
        type:String,
        required:[true,'desc must']
    },
    price:{
        type:Number,
        required:[true,'price must']
    },
    quantity:{
        type:Number,
        required:[true,'quant must']
    },
    offer:{
        type:Number
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'cat is must'],
        ref:'Ncategory'
    },
    image:{
        type:[String],
        required:[true,'image must']
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;



