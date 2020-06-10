const { Notifications } = require('./../notifications/Notifications.js')
const { Posts } = require('./Posts.js')
const { postTemplate } = require('../utility/pagesTemplates.js')

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

exports.sendPostsWeek = (topico) => {
  const post = new Posts()
  return post.sendPostWeek(topico)
}

exports.renderPost = (req, resp) => {
  
  const post = new Posts();

  return post.getPost(req.query.idPost)
      .then((data) => {
          return resp.status(200).send(postTemplate(data))
      })
      .catch((error) => console.error(`${error} controller`) )
}
