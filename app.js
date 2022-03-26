const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv/config')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())

// Middleware - function that executes when routes are hit.
// app.use('/posts', ()=>{
//     console.log('This is a middleware running')
// })

// Import Routes
const postsRoute = require('./routes/posts');
const electionsRoute = require('./routes/elections')
const candidatesRoute = require('./routes/candidates')
app.use('/posts', postsRoute)
app.use('/elections', electionsRoute)
app.use('/candidates', candidatesRoute)

//Connect To Db
mongoose.connect('mongodb+srv://nanakweku:Evrt5HN5uk9dSsbU@cluster0.ajdd4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to db');
})
.catch((err)=>{
    console.log('Cant connect to db' + err)
})

//How do we boot up the server
app.listen(process.env.PORT || 3000) 