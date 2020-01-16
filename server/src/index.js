const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('../config/config')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const { checkAuth } = require('./lib/index')
require('./passport/passport')
const { User } = require('./models/user')
const app = express()

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({secret: 'you secret key'}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

app.listen(process.env.PORT || config.port,
  () => console.log(`Server start on port ${config.port} ...`))


app.get('/home', checkAuth(), (req, res) => {
  res.send('Home page. You\'re authorized.')
})

require('./routes/authorization/login')(app, passport)
require('./routes/authorization/registration')(app, User)
require('./routes/reception_documents/index')(app)
