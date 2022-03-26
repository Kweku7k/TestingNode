const express = require ('express')
const router = express.Router()
const Candidates = require('../models/Candidates')

//ROUTES
router.get('/', async(req,res) => {
    console.log(req.params)
    try{
        console.log(req.url)
        const candidates = await Candidates.find();
        res.json(candidates);
    }
    catch(err){
        res.json({message:err})
    }
})
//GET SPECIFIC POST
router.get('/:candidateId', async(req,res) => {
    console.log(req.body.url)
    console.log(req.params)
    try{
        const candidate = await Candidates.findById(req.params.candidateId);
        console.log(candidate)
        res.json(candidate);
    }
    catch(err){
        // res.json({message:"err"})
        console.log("There was an error")
    }
})
//CREATE A NEW POST
router.post('/', (req,res) => {
    const candidate = new Candidates({
        name: req.body.name,
        number: req.body.number,
        numberOfVotes: req.body.totalVotes,
        // votes: req.body.votes,
        categories: req.body.categories,
        subcategories: req.body.categories

    });
    candidate.save()
            .then(data=>{
                res.json(data)
            })
            .catch(err=>{
                res.json({message:'There was an error' + err})
            })
})
//DELETE A SPECIFIC ELECTION
router.delete('/:candidateId', async(req,res) => {
    try{
        const removedCandidate = await Candidates.deleteOne({_id: req.params.candidateId})
        const allCandidates = await Candidates.find();
        res.json({removedCandidate, remainingCandidates:allCandidates});
    }
    catch (err){
        res.json({messgae:err})
    }
});

router.patch('/:candidateId', async (req,res)=>{
    try{
        const updatedElection = await Election.updateOne(
            {_id: req.params.candidateId},
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
