const express = require('express');
const bodyParser = require('body-parser');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const AppError = require('./utils/AppError');
const userRoute = require('./routes/auth');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const uploadRoute = require('./routes/upload');
const ncatRoute = require('./routes/ncategory');



const app = express();

app.use(bodyParser.json());


app.use('/api/user',userRoute);
app.use('/api',categoryRoute);
//app.use('/api/product',productRoute);
app.use('/api',productRoute);
app.use('/api',cartRoute);
app.use('/api/upload',uploadRoute);
app.use('/api',ncatRoute);

app.all('*',(req,res,next)=>{
    next(new AppError('Invalid Url',404))
})

app.use(globalErrorHandler);

module.exports = app;
