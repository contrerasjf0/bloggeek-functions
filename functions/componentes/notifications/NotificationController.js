const Notifications = require('./Notifications.js')


exports.tokenCreationController = dataSnapshot => {
  const notifications = new Notifications.Notifications()
  
  return notifications.registerTokenToTopic(dataSnapshot.data().token)
}