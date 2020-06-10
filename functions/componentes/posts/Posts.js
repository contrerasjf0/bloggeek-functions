const admin = require('firebase-admin')
const functions = require('firebase-functions')
const path = require('path')
const os = require('os')
const fs = require('fs')
const vision = require('@google-cloud/vision')
const { Email } = require('./../utility/EmailHelper.js')
const template = require('./../utility/EmailTemplate.js')
const { Notifications } = require('./../notifications/Notifications.js')

class Posts {
  registerAuthor (postId, newPost, oldPost) {
    // Challenge
  }

  validateImage (file) {

    const filePath = file.name
    const fileName = path.basename(filePath)
    const idPost = path.basename(filePath).split('.')[0]
    const bucket = admin.storage().bucket()
    const tmpFilePath = path.join(os.tmpdir(), fileName)


    const cliente = new vision.ImageAnnotatorClient()
    
    return bucket
      .file(filePath)
      .download({
        destination : tmpFilePath
      })
      .then(() => {
        return cliente.safeSearchDetection(tmpFilePath)
      })
      .then(result => {
        const adult = result[0].safeSearchAnnotation.adult
        const violence = result[0].safeSearchAnnotation.violence
        const medical = result[0].safeSearchAnnotation.medical
        return (
          this.isAdequate(adult) &&
          this.isAdequate(medical) &&
          this.isAdequate(violence)
        )
      })
      .then(resp => {
        if(resp){
          this.updatePostState(idPost, true)
          return resp
        }

        return this.sendNotRespImageInappropriate(idPost)
      })

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

    const endDate = new Date()
    let startDate = new Date()
    startDate.setDate(endDate.getDate() - 5)
    let emails = ''

    return admin
      .firestore()
      .collection('usersEmails')
      .get()
      .then(userEmails => {
        userEmails.forEach(userEmail => {
          emails += `${userEmail.data().email}, `
        })
        return emails
      })
      .then(() => {
        return admin
          .firestore()
          .collection('posts')
          .where('date', '>=', startDate)
          .where('date', '<=', endDate)
          .where('public  ', '==', true)
          .get()
      })
      .then(posts => {
        if (!posts.empty) {
          const textHtml = template.weekVideoTemplate(posts)
          const objEmail = new Email()

          return objEmail.sendEmail(
            'info@conjf.com.mx',
            emails,
            '',
            'Video Blogekk - The week geek videos',
            textHtml
          )
        }

        return null
      })
  }

  getPost (id) {
    
    return admin
      .firestore()
      .collection('posts')
      .doc(id)
      .get()
      .then(post => {
        return post.data()
      })
      .catch((error) => console.error(`${error} post`) )
  }
}

exports.Posts = Posts 
