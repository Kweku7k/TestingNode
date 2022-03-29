const express = require ('express')
const router = express.Router()
const SubCategories = require('../models/SubCategories')

//ROUTES
router.get('/', async(req,res) => {
    console.log(req.params)
    try{
        console.log(req.url)
        const subCategories = await SubCategories.find();
        res.json(subCategories);
    }
    catch(err){
        res.json({message:err})
    }
})
//GET SPECIFIC POST
router.get('/:election', async(req,res) => {
    console.log(req.body.url)
    console.log(req.params)
    try{
        const category = await Categories.find({election:req.params.election});
        console.log(category)
        res.json(category);
    }
    catch(err){
        // res.json({message:"err"})
        console.log("There was an error")
    }
})
//GET SPECIFIC POST
router.get('/:election/:category', async(req,res) => {
    console.log(req.body.url)
    console.log(req.params)
    try{
        const category = await SubCategories.find({election:req.params.election, name:req.params.category});
        console.log(category)
        res.json(category);
    }
    catch(err){
        console.log("There was an error")
    }
})
//GET SPECIFIC SUN CATEGORY
router.get('/:election/:category/:subcategory', async(req,res) => {
    console.log(req.body.url)
    console.log(req.params)
    try{
        const category = await SubCategories.find({election:req.params.election, category:req.params.category, name:req.params.subcategory});
        console.log(category)
        res.json(category);
    }
    catch(err){
        console.log("There was an error")
    }
})
//CREATE A NEW POST
router.post('/', (req,res) => {
    const subCategory = new SubCategories({
        name: req.body.name,
        election: req.body.election,
        category: req.body.category,
        startDate: req.body.startDate,
        emoji: req.body.emoji,
        totalSubCategories: req.body.totalSubCategories
    });
    subCategory.save()
            .then(data=>{
                res.json(data)
            })
            .catch(err=>{
                res.json({message:'There was an error' + err})
            })
    // console.log("Hit Success")
})
//DELETE A SPECIFIC ELECTION
router.delete('/:categoryId', async(req,res) => {
    try{
        const removedCategory = await Categories.deleteOne({_id: req.params.categoryId})
        const allCategories = await Categories.find();
        res.json({removedCategory, remainingCategories:allCategories});
    }
    catch (err){
        res.json({messgae:err})
    }
});

router.patch('/:categoryId', async (req,res)=>{
    try{
        const updatedCategory = await Categories.updateOne(
            {_id: req.params.categoryId},
            {$set:{
                name: req.body.name ? req.body.name : updatedCategory.name,
                subCategories: req.body.subCategories ? req.body.subCategories : updatedCategory.subCategories,
            }}
        );
        // res.json(updatedCategory)
    } catch (err){
        console.log(err)
        res.json({message: err})
    }
})

module.exports = router
