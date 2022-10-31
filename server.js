const express = require('express')
const router = require('./routes/code')
const mongoose = require('mongoose')
const Codes = require('./models/Codes')
require('dotenv').config()

const app = express()

mongoose.connect('mongodb+srv://AILIBRARY:MTE2008MTE@codes.npb9iop.mongodb.net/test',{
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

app.get('/', async (req, res) => {
    const codes = await Codes.find().sort({date:'desc'})
    res.render('index', {codes:codes})
})

app.use('/code', router)

app.listen(process.env.PORT || 3000)
