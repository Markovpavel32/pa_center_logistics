module.exports = (app, User) => {
  app.post('/registration', (req, res) => {
    console.log(req.query)
    User.findOrCreate({ where:{login: req.query.login}, defaults: {password: req.query.password} })
      .then(([user, created]) => {
        if (!created) res.send('User have been created!')
      })
  })
}
