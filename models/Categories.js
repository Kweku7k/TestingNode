const mongoose = require('mongoose')

const CategoriesSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    emoji:{
        type:String,
        required:true
    },
    election:{
        type:String,
        require:true
    },
    totalSubCategories:{
        type:Number,
        required:true
    },
    subCategories:{
        type: Array,
        required:false
    },
    startDate:{
        type:Date,
        default:null  
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Categories',CategoriesSchema)