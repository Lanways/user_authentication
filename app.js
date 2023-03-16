const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const User_Account = require('./models/user_account')

if (process.env.NODE.ENW !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MOGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connect!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/welcome', (req, res) => {
  res.render('welcome')
})

app.listen(3000, () => {
  console.log('Express running on localhost:3000')
})