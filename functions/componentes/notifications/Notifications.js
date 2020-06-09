const admin = require('firebase-admin')

class Notifications {
  registerTokenToTopic (token) {
    const registrationTokens = [token]

    return admin
      .messaging()
      .subscribeToTopic(registrationTokens, 'NewPosts')
      .then(() => {
        return console.log(`The token was added successfully to the topic`)
      })
      .catch(error => {
        console.error(`An error has happened in the token registration to the topic => ${error}`)
      })
  }

  sendNotification (title, description, topic, type) {
    const topicSend = topic === null ? 'NewPosts' : topic

    const message = {
      data: {
        title: title,
        description: description,
        type: type    
      },
      topic: topicSend
    }

    return admin
      .messaging()
      .send(message)
      .then(() => {
        return console.log(`Message successfully sent to the topic NewPosts`)
      })
      .catch(error => {
        console.error(
          `Error sending message to the topic NewPosts => ${error}`
        )
      })
  }

  sendNotificationToToken (title, description, type, token) {
    console.log("token")
    console.log(token)
    const message = {
      data: {
        title: title,
        description: description,
        type: type
      },
      token: token
    }

    return admin
      .messaging()
      .send(message)
      .then(() => {
        return console.log(`Message successfully sent to token`)
      })
      .catch(error => {
        console.error(`Error sending message to token => ${error}`)
      })
  }
}

exports.Notifications = Notifications
