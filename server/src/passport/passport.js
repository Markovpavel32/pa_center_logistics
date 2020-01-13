const passport = require('passport')
const LocalStrategy = require('passport-local')
const { User } = require('../models/user')

const local_strategy = new LocalStrategy({
  usernameField: 'login'
}, (login, password, done) => {
  console.log(login)
  User.findOne({ where: { login } })
    .then((user) => {
      if (!user) return done(null, false, { errors: { 'email or password': 'is invalid' } });
      if (user.password != password) return done(null, false, { errors: { 'password': 'is invalid' } });
      return done(null, user)
    })
})

passport.use(local_strategy)
