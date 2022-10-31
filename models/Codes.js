const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

const Codes = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    programming_language:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    code:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true,
        unique: true
    }
})

Codes.pre('validate', function(next) {
    if (this.title){
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

   next()
})

module.exports = mongoose.model('Codes', Codes)