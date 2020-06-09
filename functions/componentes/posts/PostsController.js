const { Notifications } = require('./../notifications/Notifications.js')
const { Posts } = require('./Posts.js')

exports.postUpdateController = (dataSnapshot, context) => {
  const notifications = new Notifications()

  /*if (
    dataSnapshot.before.data().publicado === false &&
    dataSnapshot.after.data().publicado === true
  ) {*/
    return notifications.sendNotification(
      dataSnapshot.data().title,
      dataSnapshot.data().description,
      null,
      ''
    )
  //}

  //return null

}

exports.authorController = (dataSnapshot, context) => {
  // Challenge
}

exports.validateImgPostController = img => {
  
}

exports.sendPostsWeek = (req, resp, next) => {
  
}
