const requireAuth = require('../middlewares/requireAuth')

const express = require('express')
const mongoose = require('mongoose')

const Hunt = mongoose.model('Hunt')

const router = express.Router()

router.use(requireAuth)

router.get('/hunts', async (req, res) => {
  const hunts = await Hunt.find({ userId: req.user._id })

  res.send(hunts)
})

router.post('/hunts', async (req, res) => {
  const { picture, location, weather, formInfo } = req.body
  if (!picture || !formInfo) {
    return res
      .status(422)
      .send({ error: 'You must provide a picture and a form' })
  }

  try {
    const hunt = new Hunt({
      picture,
      Date: new Date(),
      location,
      weather,
      formInfo,
      userId: req.user._id
    })
    await hunt.save()
    res.send(hunt)
  } catch (err) {
    res.status(422).send({ error: err.message })
  }
})

module.exports = router
