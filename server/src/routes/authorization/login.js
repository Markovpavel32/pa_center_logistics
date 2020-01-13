module.exports = (app, passport) => {
  app.post('/login',
    passport.authenticate('local'),
    function (req, res) {
      res.send('User have been created!')
    }
  )
}
