class AppError extends Error{
    constructor(msg,statusCode){
        super(msg);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4')?'fail':'something wrong from apperror';
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = AppError;