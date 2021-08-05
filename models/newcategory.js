const mongoose = require('mongoose');
const slugify = require('slugify');

const newCategorySchema = new mongoose.Schema({
    name:{
        type:String
    },
    slug:{
        type:String,
        index:true
    },

    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        default:null,
        ref:'Ncategory'
    },
    ancestors:[
        {
         _id:{
             type:mongoose.Schema.Types.ObjectId,
             ref:'Ncategory',
            index:true

        },
        name:{
            type:String
        },
        slug:{
            type:String
        }
        }
        

    ]

});



newCategorySchema.pre('save',function(next){
    this.slug = slugify(this.name);
    next();
})

const Ncategory = mongoose.model('Ncategory',newCategorySchema);

module.exports = Ncategory;