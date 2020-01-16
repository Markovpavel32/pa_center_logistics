module.exports = (app, passport) => {
  app.post('/login', (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      if (!user) res.status(401).send(info.message)
      else res.send('Welcome')
    })(req,res)
  })
}
