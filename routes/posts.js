const express = require('express');
const { resetWatchers } = require('nodemon/lib/monitor/watch');
const router = express.Router();
const Post = require('../models/Post')
// ROUTES
router.get('/', (req,res) => {
    res.send('We are on home')
}) 

router.post('/', (req,res) => {
    const post = new Post({
        title:req.body.title,
        description:req.body.description
    });

    post.save()
        .then(data => {
            res.json(data);
        })  
        .catch(err => {
            res.status(400)
            console.log("There was an error")
            console.log(err)
            res.json({message:err})
        })
})

router.delete('/:postId', (req,res) => {
    try{
        removedPost = Post.remove({_id:req.params.postId})
        res.json(removedPost)
    }
    catch{err=>{
        res.json({message:err})
    };}
})


module.exports = router