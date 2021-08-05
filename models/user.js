const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        lowercase:true
        
    },
    lastName:{
        type:String,
        trim:true,
        lowercase:true
    },
    username:{
        type:String,
        trim:true,
        unique:true
        
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        select:false
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    profilePic:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        default:''
    }
},{timestamps:true});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
          return next();
    }
    this.password = await bcrypt.hash(this.password,12);
    next();

})

const User = mongoose.model('User',userSchema);

module.exports = User;