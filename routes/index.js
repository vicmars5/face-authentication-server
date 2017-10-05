
module.exports = (app) => {
  app.use('/', require('./main.js'))
  app.use('/user-photos', require('./user-photos'))
  app.use('/users', require('./users'))
  app.use('/auth', require('./auth'))
}
