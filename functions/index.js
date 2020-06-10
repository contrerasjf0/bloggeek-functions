const functions = require('firebase-functions')
const admin = require('firebase-admin')
const userController = require('./componentes/users/UserController.js')
const notificationController = require('./componentes/notifications/NotificationController.js')
const postsController = require('./componentes/posts/PostsController.js')
const express = require('express')
const cors = require('cors')
//const errorController = require('./componentes/errores/ErrorController.js')
//const analyticalController = require('./componentes/analytical/AnalyticalController.js')

const app = express()
app.use(cors())


const serviceAccount = require("./blogeek-d1979-PrivateKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://blogeek-d1979.firebaseio.com"
});

admin.firestore().settings({ timestampsInSnapshots: true })

// firebase functions:config:set configuration.email="XXXX" configuration.password="XXXXXX"
// firebase functions:config:set configuration.claveapihubspot="XXXX"
// firebase functions:config:set configuration.numcelularerror="XXXX"
// firebase functions:config:set configuration.accountsidtwilio="XXXX"
// firebase functions:config:set configuration.authtokentwilio="XXXX"

app.post('/v1', (req, resp, next) => {
  return postsController
    .sendPostsWeek(req.body.data.topic)
    .then(() => {
      return resp.status(200).json({
        result: true
      })
    })
    .catch(error => {
      return next(new Error(error.toString()))
    })
})

app.use((error, req, res, next) => {
  if (error) {
    console.error(`${error}`)
    return res.status(500).json({
      responseError: error.message
    })
  }

  return console.error(`${error}`)
})


exports.createUser = functions.auth
  .user()
  .onCreate(userController.userCreationController)

exports.eliminacionUsuario = functions.auth
  .user()
  .onDelete(userController.userRemoveController)

exports.createUserCRM = functions.auth
  .user()
  .onCreate(userController.createUserCRM)

exports.registerTopic = functions.firestore
  .document('/tokens/{id}')
  .onCreate(notificationController.tokenCreationController)

exports.sendNotification = functions.firestore
  .document('posts/{idPost}')
  .onCreate(postsController.postUpdateController)

exports.validateImg = functions.storage
    .object()
    .onFinalize(postsController.validateImgPostController)

exports.sendWeekPost = functions.https.onRequest(app)

exports.renderPost = functions.https.onRequest(postsController.renderPost)