const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const blogRouter = require('./routes/blogs')
app.use('/blogs',blogRouter)

app.listen(3000, () => {
    console.log('Server started')
})