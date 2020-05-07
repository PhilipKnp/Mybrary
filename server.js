//check if we are not in the dev envoirement
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

//hook the index router to the server file so its actually accessible
const indexRouter = require('./routes/index')

app.set('view engine', 'ejs') //set the view engine to ejs
app.set('views', __dirname + '/views') //where our views are coming from
app.set('layout', 'layouts/layout') //layout file location (so we dont need to redo the header & footer)
app.use(expressLayouts) //we want to use express Layouts
app.use(express.static('public')) //public folder for stylesheet, js and image files

//setup mongoDB database
const mongoose = require('mongoose')

//setup connection for database
mongoose.connect(process.env.DATABASE_URL, { 
useNewUrlParser: true })

//check db connection
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

//make the app use this route
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)