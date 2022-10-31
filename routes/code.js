const express = require('express')
const Codes = require('../models/Codes')
const Router = express.Router()

Router.get('/post', (req, res) => {
    res.render('form')
})

Router.get('/about', (req, res) => {
    res.render('about')
})

Router.get('/search', async(req, res) => {
    const codes = await Codes.find()
    res.render('search', {codes: codes})
})

Router.get('/:slug', async (req, res) => {
    const codes = await Codes.findOne({slug: req.params.slug})
    res.render('show', {codes:codes})
})

Router.post('/', async (req, res) => {
    let codes = new Codes({
        title: req.body.title,
        description: req.body.description,
        programming_language: req.body.programming_language,
        user: req.body.username,
        code: req.body.codes
    })
    try{
        codes = await codes.save()
        res.redirect(`/code/${codes.slug}`)
    }catch(e){
        console.log(e)
        res.render('form', {codes:codes})
    }
})

module.exports = Router