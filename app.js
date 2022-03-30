const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv/config')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express();


app.use(bodyParser.json())
app.use(cors())

// Middleware - function that executes when routes are hit.
// app.use('/posts', ()=>{
//     console.log('This is a middleware running')
// })

// Import Routes
const postsRoute = require('./routes/posts');
const electionsRoute = require('./routes/elections')
const candidatesRoute = require('./routes/candidates')
const categoriesRoute = require('./routes/categories');
const SubCategoriesRoute = require('./routes/subCategories');
app.use('/posts', postsRoute)
app.use('/elections', electionsRoute)
app.use('/candidates', candidatesRoute)
app.use('/categories', categoriesRoute)
app.use('/subcategories', SubCategoriesRoute)

//Connect To Db
mongoose.connect('mongodb+srv://nanakweku:Evrt5HN5uk9dSsbU@cluster0.ajdd4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to db');
})
.catch((err)=>{
    console.log('Cant connect to db' + err)
})

//How do we boot up the server
app.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode");
  }); 