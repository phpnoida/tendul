const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    contacts:[
        {
            name:{
                type:String,
                required:true
            },
            phone:{
                type:String,
                required:true
            },
            city:{
                type:String,
                required:true
            },
            state:{
                type:String,
                required:true
            },
            addressLine:{
                type:String,
                required:true
            }
        }
    ]

});

const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact;