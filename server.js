const env = require('dotenv');
env.config();
//env.config({path:'./config.env'});
const mongoose = require('mongoose');
if(process.env.NODE_ENV==='development')
{
    mongoose.connect(`mongodb://localhost:27017/flipkart`,{
       useNewUrlParser: true, 
       useUnifiedTopology: true,
       useCreateIndex:true,
       useFindAndModify:false
    })
    .then(()=>{
        console.log('Dev database connected')
    }).catch((err)=>{
        console.log(err)
    })
}

const app = require('./app');

const server = app.listen(process.env.PORT,()=>{
    console.log('Server is listening..')
})