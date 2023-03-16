const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const User_Account = require('./models/user_account')
const bodyParser = require('body-parser')
if (process.env.NODE_ENV !== 'production') {
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
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/welcome', (req, res) => {
  console.log('req.body', req.body)
  const { email, password } = req.body
  User_Account.findOne({ email })
    .lean()
    .then(data => {
      if (data && data.email === email && data.password === password) {
        res.render('welcome', { name: data.firstName })
      } else {
        res.render('index', {errorMessage: 'Invalid email or password'})
      }
    })
    .catch((error) => console.log(error))
})

app.get('/shop', (req, res) => {
  res.render('shop')
})

app.listen(3000, () => {
  console.log('Express running on localhost:3000')
})