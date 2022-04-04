const mongoose = require('mongoose')

const Candidates = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    election:{
        type:String,
        required:true
    },
    image:{
        type: String,
        default:'some-random-png-file'
    },
    totalVotes:{
        type: Number,
        default: 0
    },
    categories:{
        type:Array,
        required:false
    },
    emoji:{
        type:String,
        required:true
    },
    totalSubCategories:{
        type:Number,
        required:false
    },
    
})

module.exports = mongoose.model('Candidates',Candidates)