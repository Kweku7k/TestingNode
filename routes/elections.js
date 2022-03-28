const express = require ('express')
const router = express.Router()
const Election = require('../models/Elections')

//ROUTES
router.get('/', async(req,res) => {
    try{
        console.log(req.url)
        const elections = await Election.find();
        res.json(elections);
    }
    catch(err){
        res.json({message:"err"})
    }
})
//GET SPECIFIC POST
router.get('/:slugName', async(req,res) => {
    console.log(req.body.url)
    try{
        const election = await Election.find({slugName:req.params.slugName});
        res.json(election);
    }
    catch(err){
        // res.json({message:"err"})
        console.log("There was an error")
    }
})
//CREATE A NEW POST
router.post('/', (req,res) => {
    const election = new Election({
        name: req.body.name,
        slugName: req.body.slugName,
        emoji: req.body.emoji,
        candidates: req.body.candidates,
        categories: req.body.categories
    });
    election.save()
            .then(data=>{
                res.json(data)
            })
            .catch(err=>{
                res.json({message:'There was an error' + err})
            })
})
//DELETE A SPECIFIC ELECTION
router.delete('/:electionId', async(req,res) => {
    try{
        const removedElection = await Election.deleteOne({_id: req.params.electionId})
        const allElections = await Election.find();
        res.json({removedElection, remainingElections:allElections});
    }
    catch (err){
        res.json({messgae:err})
    }
});

router.patch('/:electionId', async (req,res)=>{
    try{
        const updatedElection = await Election.updateOne(
            {_id: req.params.electionId},
            {$set:{
                name:req.body.name
            }}
        );
        res.json(updatedElection)
    } catch (err){
        res.json({message: err})
    }
})

module.exports = router
