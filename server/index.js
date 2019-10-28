require('./models/User')
const authRoutes = require('./routes/authRoutes')
const requireAuth = require('./middlewares/requireAuth')

const express = require('express')
const debug = require('debug')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const mongoDebug = debug('mongo')
const expressDebug = debug('express')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)

const MONGO_URI =
  'mongodb+srv://dbUser:dbUserPassword@cluster0-dkyvy.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
  mongoDebug('Connected to mongo instance')
})
mongoose.connection.on('error', err => {
  mongoDebug('Error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  expressDebug(`Listening on port ${port}`)
})
