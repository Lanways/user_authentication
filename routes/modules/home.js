const express = require('express')
const router = express.Router()
const User_Account = require('../../models/user_account')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/welcome', (req, res) => {
  console.log('req.body', req.body)
  const { email, password } = req.body
  User_Account.findOne({ email })
    .lean()
    .then(data => {
      //如果有找到資料而且跟post進的資料相符，將userId寫進cookies
      //_id為mogodb建立資料時自動生成的ObjectID
      if (data && data.email === email && data.password === password) {
        res.cookie('userId', data._id)
        res.render('welcome', { name: data.firstName })
      } else {
        res.render('index', { errorMessage: 'Invalid email or password' })
      }
    })
    .catch((error) => console.log(error))
})

router.get('/shop', (req, res) => {
  console.log(req.cookies)
  //如果使用者有cookies.userId就能進入shop page，沒有責跳回登入畫面
  //進入shop page前刪除cookies裡的userId做測試
  const { userId } = req.cookies
  if (!userId) {
    res.render('index', { errorMessage: 'Please log in again' })
    return
  }
  res.render('shop')
})

module.exports = router