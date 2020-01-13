module.exports = (app, User) => {
  app.post('/registration', (req, res) => {
    console.log(req.query)
    User.findOrCreate({
      defaults: { password: req.query.password },
      where: { login: req.query.login },
    })
      .then(([user, created]) => {
        if (!created) res.send('User have been created!')
      })
  })
}
