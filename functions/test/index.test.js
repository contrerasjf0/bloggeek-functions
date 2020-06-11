const test =  require('firebase-functions-test')(
  {
    databaseURL: "https://blogeek-d1979.firebaseio.com",
    projectId: "blogeek-d1979",
    storageBucket: "blogeek-d1979.appspot.com"
  },
  '../blogeek-d1979-PrivateKey.json'
)


test.mockConfig({
  "configuration": {
    "password": "c0ntr3r4505gma",
    "email": "contrerasjf.0@gmail.com"
  }
})

const functions = require('./../index.js')


describe('functions', () => {

  after(() => {
    test.cleanup()
  })

  describe('newErrorAppTest', () => {
    it('SMS sent success', (done) => {
        const nuevoErrorWrap = test.wrap(functions.newErrorApp)
        const data = test.crashlytics.exampleIssue()

        nuevoErrorWrap(data)
          .then(() => {
            return done()
          })
          .catch(() => {
            return done(error)
          })
    })


    describe('sendNotificationTest', () => {
      it('send Notification', (done) => {
        const sendNotificationWrap = test.wrap(functions.sendNotification)
        const dataAfter = test.firestore.exampleDocumentSnapshot({
          public: true,
          title: 'Unit Test',
          description: 'Unitest Description'
        }, '')

        const dataBefore = test.firestore.exampleDocumentSnapshot({
          public: false
        }, '')

        const changes = test.makeChange(dataBefore, dataAfter)

        sendNotificationWrap(changes)
        .then(() => {
          return done()
        })
        .catch((error) => {
          return done(error)
        })
      })
    })
  })








})