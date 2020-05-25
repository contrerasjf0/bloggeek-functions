const admin = require('firebase-admin')
const functions = require('firebase-functions')
const path = require('path')
const os = require('os')
const fs = require('fs')
//const vision = require('@google-cloud/vision')
const { Email } = require('./../utility/EmailHelper.js')
const template = require('./../utility/EmailTemplate.js')
const { Notifications } = require('./../notifications/Notifications.js')

class Posts {
  registerAuthor (postId, newPost, oldPost) {
    // Challenge
  }

  validateImage (file) {
  }

  isAdequate (result) {
    return (
      result !== 'POSSIBLE' &&
      result !== 'LIKELY' &&
      result !== 'VERY_LIKELY'
    )
  }

  updatePostState (postId, state) {
    const refAuthor = admin
      .firestore()
      .collection('posts')
      .doc(postId)

    return refAuthor.update({
      public: state
    })
  }

  sendNotRespImageInappropriate (postId) {
    console.log(`Check PostId Token => ${postId}`)

    return admin
      .firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(post => {
        console.log(post)
        if (post.data().token !== null && post.data().token !== undefined) {
          console.log(`postId token => ${post.data().token}`)
          const notifications = new Notifications()
          notifications.sendNotificationToToken(
            'Posts with image not allowed',
            'Your post cannot be displayed since the image is not allowed',
            'notvalidationImage',
            post.data().token
          )
        }

        return post
      })
  }

  sendPostWeek (notificationTopic) {
    
  }
}

exports.Posts = Posts
