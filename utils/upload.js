const {nanoid} = require('nanoid');
const multer = require('multer');
var AWS = require('aws-sdk');
const AppError = require('./AppError');


const multerStorage = multer.memoryStorage();
const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        cb(new AppError('only images',400),false)
    }
}

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
});

exports.uploadHandler = upload.array('productPhoto');

exports.uploadS3 = (req,res,next)=>{
    if(!req.files){
        return next(new AppError('Pls send images',400));
    }
}
