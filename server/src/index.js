const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('../config/config')
const session = require('express-session')
const app = express()
const passport = require('../src/passport/passport')
const { User } = require('./models/user')

app.use(morgan('combined'))
app.use(cors({credentials: true, origin: 'http://localhost:8080'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
  secret: 'you secret key',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

app.listen(process.env.PORT || config.port,
  () => console.log(`Server start on port ${config.port} ...`))

require('./routes/authorization/login')(app, passport)
require('./routes/authorization/registration')(app, User)
require('./routes/reception_documents/index')(app)
require('./routes/authorization/user_data')(app)
