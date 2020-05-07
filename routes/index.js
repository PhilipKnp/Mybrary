//create routes for out app
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

//export this file for the server.js app
module.exports = router