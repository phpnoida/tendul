const mongoose = require('mongoose');

const expSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    cName:{
        type:String,
        default:''
    },
    mentoring:{
        type:Number,
        default:1
    },
    pastExp:[
        {
            name:{
                type:String
            },
            from:{
                type:String
            },
            to:{
                type:String
            }
        }
    ]
},{timestamps:true})

const Experience = mongoose.model('Experience',expSchema);

module.exports = Experience;