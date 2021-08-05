const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    slug:{
        type:String,
        trim:true,
        unique:true
    },
    type:{
        type:String,
        default:''
    },
    img:{
        type:String,
        default:''
    },
    parentId:{
        type:String
    }
},{timestamps:true})

const Category = mongoose.model('Category',categorySchema);

module.exports = Category;