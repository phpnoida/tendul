const Product = require('./../models/product');
const slugify = require('slugify');
const catchAsync = require('../utils/catchAsync');
const Category = require('../models/newcategory');


exports.createProduct = catchAsync(async(req,res,next)=>{
    console.log('from create product..')
    req.body.createdBy = req.currentUser._id;
    const product = await Product.create(req.body);
    res.status(201).json({
        status:'success',
        message:'product added'
    })

});

exports.getAll = catchAsync(async(req,res,next)=>{
    console.log('from all..');
    const products = await Product.find({}).populate({
        path:'Ncategory',
        select:'name'
    }).populate({
        path:'createdBy',
        select:'firstName role'
    })
    res.status(200).json({
        status:'success',
        totalRec:products.length,
        data:products
    })
})

//get all products on the basis of slug or we can do it on basis of id
exports.getAllBySlug = catchAsync(async(req,res,next)=>{
    console.log(req.params.slug);
    const slug = req.params.slug;
    const category = await Category.findOne({
        slug:slug
    })
    if(category){
        const products = await Product.find({
            category:category._id

        })
        res.status(200).json({
            status:'success',
            totalRec:products.length,
            data:products,
            productsUnder:{
                under5k:products.filter((el)=>{return el.price<=5000}),
                under10k:products.filter((el)=>{return el.price>5000 && el.price<=10000}),
                under15k:products.filter((el)=>{return el.price>10000 && el.price<=15000}),
                under20k:products.filter((el)=>{return el.price>15000 && el.price<=20000})
            }
        })
    }

})

//write controller for getting one particular product by it id