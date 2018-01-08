const auth = require('../utils/jwt')

module.exports = (app) => {
  app.use(auth.validate) // jwt authentication

  app.use('/', require('./main.js'))
  app.use('/person-groups', require('./person-groups'))
  app.use('/user-photos', require('./user-photos'))
  app.use('/users', require('./users'))
  app.use('/auth', require('./auth'))
  app.use('/photo-auth/', require('./photo-auth'))
}
