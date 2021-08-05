const {body,validationResult} = require('express-validator');

exports.validateCurrExp = [
    body('cName').notEmpty().withMessage('Current company name is must'),
    body('mentoring').notEmpty().withMessage('Mentoring is must')

]

exports.validatePastExp = [
    body('name').notEmpty().withMessage('past company name is must')
]

exports.isValidated = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err)=>{
         extractedErrors.push({
            [err.param]:err.msg
        })
    });
   return res.status(422).json({
        status:'fail',
        errors:extractedErrors
    })
}