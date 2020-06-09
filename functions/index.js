const functions = require('firebase-functions')
const admin = require('firebase-admin')
const userController = require('./componentes/users/UserController.js')
//const notificationController = require('./componentes/notificaciones/NotificationController.js')
//const postsController = require('./componentes/posts/PostsController.js')
//const errorController = require('./componentes/errores/ErrorController.js')
//const analyticalController = require('./componentes/analytical/AnalyticalController.js')

var serviceAccount = require("./blogeek-d1979-PrivateKey.json");

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

exports.createUser = functions.auth
  .user()
  .onCreate(userController.userCreationController)

exports.eliminacionUsuario = functions.auth
  .user()
  .onDelete(userController.userRemoveController)

exports.createUserCRM = functions.auth
  .user()
  .onCreate(userController.createUserCRM)
