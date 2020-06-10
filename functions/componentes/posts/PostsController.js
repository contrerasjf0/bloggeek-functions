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
  
  if (!imagen.name.match(/imgsposts/)) {
    return null
  }

  if (!imagen.contentType.startsWith('image/')) {
    console.error('The files is not an image.')
    return null
  }

  const posts = new Posts()

  return posts.validateImage(imagen).catch(error => {
    console.error(`${error}`)
  })

}

exports.sendPostsWeek = (req, resp, next) => {
  
}
