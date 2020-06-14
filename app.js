const path = require('path');
const express = require('express')
const app = express()

const bodyParser = require('body-parser') 
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

const donate = require('./donate')
app.use('/donate',donate)
app.use(express.static(path.join(__dirname, 'public')));