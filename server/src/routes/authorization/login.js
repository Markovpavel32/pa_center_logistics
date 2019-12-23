module.exports = (app, passport) => {
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.get('/login', (req, res) => {
    res.send('Login page. Please, authorize.')
  })
}
