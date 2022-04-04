const mongoose = require('mongoose')

const ElectionSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slugName:{
        type:String,
        required:true
    },
    emoji:{
        type:String,
        required:true
    },
    candidates:{
        type:Array,
        required:false
    },
    categories:{
        type: Array,
        required:false
    },
    startDate:{
        type:Date,
        default:null  
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Elections',ElectionSchema)