const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')
  return next()
})

routes.get('/app/available/:provider', AvailableController.index)

routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.get('/files/:file', FileController.show)

routes.use('/app', authMiddleware)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', guestMiddleware, SessionController.store)

// Rota que atraés do método create de UserController faz o chamado do formulário
// de criação de usuário.
routes.get('/signup', guestMiddleware, UserController.create)

// Rota que através do método store de UserController faz o Store do User.
// Este método é chamado via action="/signup" do form de cadastro (Por isso POST).
routes.post('/signup', upload.single('avatar'), UserController.store)
routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)

module.exports = routes
