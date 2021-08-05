const Contact = require('./../models/contact');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.addContacts = catchAsync(async(req,res,next)=>{
    console.log('from add contacts..')
    const userId = req.currentUser._id;
    const isUser = await Contact.findOne({
        userId:userId
    });
    if(isUser){
        await Contact.updateOne({
            userId:userId
        },{
            $push:{
                "contacts":req.body.contacts
            }
        })

        res.status(201).json({
                status:'success',
                message:'new contacts added..'
            })

    }else{

         await Contact.create({
                userId:userId,
                father:req.body.father,
                contacts:req.body.contacts

            })
            res.status(201).json({
                status:'success',
                message:'first contacts added..'
            })
    }//else end
    
    
});

exports.getAll = catchAsync(async(req,res,next)=>{
    console.log('from all..');
    const userId = req.currentUser._id;
    const contacts = await Contact.find({
        userId:userId
    });
    res.status(200).json({
        status:'success',
        data:contacts
    })

});

exports.getOne = catchAsync(async(req,res,next)=>{
    console.log('from one..');
    const userId = req.currentUser._id;
    console.log('cid',req.params.contactId)
    const contact = await Contact.findOne({
        $and:[
            {userId:userId},
            {"contacts":{$elemMatch:{_id:req.params.contactId}}}
        ]
    },{"contacts.$":1})
    res.status(200).json({
        status:'success',
        data:contact
    })
})

exports.deleteContact = catchAsync(async(req,res,next)=>{
    console.log('delete');
    const userId = req.currentUser._id;
    const contactId = req.params.contactId;
    const data = await Contact.updateOne({
        userId:userId

    },{
        $pull:{
            "contacts":{_id:contactId}
        }
    })
    res.status(200).json({
        status:'success',
        message:'deleted contact'
    })

});

exports.updateContact = catchAsync(async(req,res,next)=>{
    console.log('update..');
    const userId = req.currentUser._id;
    const contactId = req.params.contactId;
    console.log('up',req.body)
    const resData = await Contact.updateOne({
        $and:[
            {userId:userId},
            {"contacts":{$elemMatch:{_id:contactId}}}
        ]
    },{
        $set:{
            "contacts.$":req.body.contacts
        }
    });
    res.status(200).json({
        status:'success',
        message:'contacts updated'
    })
})