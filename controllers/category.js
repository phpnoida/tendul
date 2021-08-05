const slugify = require('slugify');
const catchAsync = require('../utils/catchAsync');
const Category = require('./../models/category');

exports.postModule = catchAsync(async(req,res,next)=>{
    console.log('from create category');
    const categoryObj = {
        name:req.body.name,
        slug:slugify(req.body.name),
        
    }
    if(req.body.parentId){
        categoryObj['parentId']=req.body.parentId
    }

    const resData = await Category.create(categoryObj);
    res.status(201).json({
        status:'success',
        message:'category added'
    })
})

const getNestedCategory = (categories,parentId=null)=>{
    //console.log('from nesting..',categories)
    let category;
    let categoryList=[];
    if(parentId==null){
        
         category = categories.filter((cat)=>{
            return cat.parentId ==undefined
         })
         
    }else{
        category = categories.filter((cat)=>{
            return cat.parentId ==parentId
        })
    }
    for(let cate of category){
          categoryList.push({
              _id:cate._id,
              name:cate.name,
              slug:cate.slug,
              parentId:cate.parentId,
              children:getNestedCategory(categories,cate._id)
          })
    }
    return categoryList;
}

exports.getAll = catchAsync(async(req,res,next)=>{
    console.log('from get all categ');
    const categories = await Category.find({});
    if(categories){
        const nestedCategory = getNestedCategory(categories);
        res.status(200).json({
        status:'success',
        data:nestedCategory
     })
    }
    
})

//update category
exports.updateCategories = catchAsync(async(req,res,next)=>{
    console.log('from update cat');
    res.status(200).json({
        status:'success',
        data:req.body
    })
})