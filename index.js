'use strict' //ecmascript6

const mongoose = require('mongoose')
const app = require('./appExpress')
const config = require('./config/config')

mongoose.connect(config.db, {useNewUrlParser: true}, (err,res)=>{
    if (err){
        return console.log('Database connection error')
    }
    console.log('Connection established')
    app.listen(config.port, () => {
        console.log(`API listening in localhost: ${config.port}`)
    })
})

module.exports = app