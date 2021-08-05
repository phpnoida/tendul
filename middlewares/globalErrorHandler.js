const sendDevError = (err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        stack:err.stack,
    }) 
}

const sendProdError = (err,res)=>{
    console.log(err);
    res.status(500).json({
        status:'fail',
        message:'Internal server error'
    })
}


const globalErrorHandler = (err,req,res,next)=>{
    err.statusCode = err.statusCode||500;
    err.status=err.status||'Something went wrong from global';
    if(process.env.NODE_ENV==='development'){
        sendDevError(err,res);
    }
    else if(process.env.NODE_ENV==='production'){
        sendProdError(err,res);
    }
};

module.exports = globalErrorHandler;