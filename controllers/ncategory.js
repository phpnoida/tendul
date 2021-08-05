const Ncategory = require('./../models/newcategory');

const buildAncestors = async(id,parent_id)=>{
    console.log('from build ancestors');
   // let ancest = [];
    const parent = await Ncategory.findOne({
        _id:parent_id
    });
    console.log('-----',parent)
    if(parent){
        const {_id,name,slug} = parent;
        let ancest = [...parent.ancestors];
        ancest.unshift({_id,name,slug});
        console.log('array',ancest);
        await Ncategory.findByIdAndUpdate(id,{
            $set:{
                "ancestors":ancest
            }
        })
        
    }
}
exports.createCategory = async(req,res)=>{
    console.log('from creating category');
    console.log(req.body);
    const parentId = req.body.parentId ? req.body.parentId :null;
    const resData = await Ncategory.create(req.body);
    //console.log(resData._id,parentId)
    buildAncestors(resData._id,parentId);
    res.status(201).json({
        status:'sucess',
        message:'added'
    })
    
}

const getNestedCategory = (categories,parentId=null)=>{
    let category;
    let categoryList=[];
    if(parentId==null){
        category = categories.filter((cat)=>{
            return cat.parentId ==null;
        })
    }
    else{
        category =categories.filter((cat)=>{
            return JSON.stringify(cat.parentId) ==JSON.stringify(parentId);
        })
        
    }
    for(let c of category){
         categoryList.push({
            _id:c._id,
            name:c.name,
            slug:c.slug,
            parentId:c.parentId,
            children:getNestedCategory(categories,c._id)
         })
    }
     return categoryList;

    
}

//get all categories
exports.getAllCategory = async(req,res)=>{
    console.log('from all cat..');
    const categories = await Ncategory.find({});
    //console.log(categories);
    if(categories){
        const nestedCategory = getNestedCategory(categories);
        res.status(200).json({
            status:'success',
            data:nestedCategory
        })
       

    }
   
}

//get all ancestors of particular category
exports.getCategoryBySlug = async(req,res,next)=>{
    console.log('from all category list',req.query.slug);
    const resData = await Ncategory.find({
        slug:req.params.slug
    });
    res.status(200).json({
        status:'success',
        data:resData
    })
}

//get all descendats of particluar category
exports.getDescendant = async(req,res)=>{
    const resData = await Ncategory.find({
        "ancestors._id":req.query.categoryId
    }).select('name')
    res.status(200).json({
        status:'success',
        data:resData
    })
}

//delete any category
exports.deleteCategory = async(req,res)=>{
    console.log('delete category..');
    const categoryId = req.params.categoryId;
    await Ncategory.findByIdAndDelete(categoryId);
    await Ncategory.deleteMany({
        "ancestors._id":categoryId
    })
    res.status(200).json({
        status:'success',
        message:'deleted'
    })
}

