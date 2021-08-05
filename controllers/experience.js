const Experience = require('./../models/experience');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.addExp = catchAsync(async(req,res,next)=>{
    const userId = req.currentUser._id;
    const isUser = await Experience.findOne({
        userId:userId
    })
    if(isUser){
        await Experience.updateOne({
            userId:userId
        },{
            $set:{
                cName:req.body.cName,
                mentoring:req.body.mentoring

            }

        })
        res.status(200).json({
            status:'success',
            message:'experience updated'
        })

    }else{
        await Experience.create({
            userId:userId,
            cName:req.body.cName,
            mentoring:req.body.mentoring
        })
        res.status(201).json({
            status:'success',
            message:'experience added'
        })
    }

});

exports.addPast = catchAsync(async(req,res,next)=>{
    console.log('add past exp..');
    const userId = req.currentUser._id;
    const isUser = await Experience.findOne({
        userId:userId
    })
    if(isUser){
        await Experience.updateOne({
            userId:userId
        },{
            $push:{
                "pastExp":req.body.pastExp
            }
        })
        res.status(201).json({
            status:'success',
            message:'past exp added again'
        })
        

    }else{
        await Experience.create({
            userId:userId,
            pastExp:req.body.pastExp
        })
        res.status(201).json({
            status:'success',
            message:'first past exp added'

        })

    }
})

exports.getExp = catchAsync(async(req,res,next)=>{
    console.log('get exp data..')
    const userId= req.currentUser._id;
    const expData = await Experience.findOne({
        userId:userId
    });
    res.status(200).json({
        status:'success',
        data:expData

    })
})

exports.updatePastExp = catchAsync(async(req,res,next)=>{
    console.log('update past');
    const userId = req.currentUser._id;
    const pastId = req.params.pastExpId;
    const resData = await Experience.updateOne({
        $and:[
            {userId:userId},
            {pastExp:{$elemMatch:{_id:pastId}}}
        ]
    },{
        $set:{
            "pastExp.$":req.body.pastExp
        }
    })
    res.status(200).json({
        status:'success',
        message:'updated succ'
    })
})