const requireAuth = require('../middlewares/requireAuth')

const express = require('express')
const mongoose = require('mongoose')

const User = mongoose.model('User')

const router = express.Router()

router.use(requireAuth)

router.get('/user', async (req, res) => {
  const [user] = await User.find({ _id: req.user._id })

  res.send({ name: user.name, email: user.email })
})

module.exports = router
