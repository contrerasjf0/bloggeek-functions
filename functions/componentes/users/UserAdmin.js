const { Email } = require('../utility/EmailHelper.js')
const { HubSpotHelper } = require('../utility/HubSpotHelper.js')
const {
  welcomeEmailTemplate,
  farewellEmailTemplate
} = require('../utility/TemplateEmail.js')
const admin = require('firebase-admin')

class AdminUser {
  registerUserEmail (name, email) {
    console.log('register email')
    return admin
      .firestore()
      .collection('usersEmails')
      .add({
        name: name,
        email: email
      })
  }

  sendWelcomeEmail (name, email) {
    const to = email
    const from = 'info@blogeek.com'

    const textHtml = welcomeEmailTemplate(name)

    const objEmail = new Email()

    return objEmail.sendEmail(
      from,
      to,
      '',
      'Blogeek Video - Welcome to the  Videos Geek community',
      textHtml
    )
  }

  sendFarewellEmail (name, email) {
    const to = email
    const from = 'info@blogeek.com'

    const textHtml = farewellEmailTemplate(name)

    const objEmail = new Email()

    return objEmail.sendEmail(
      from,
      to,
      '',
      'Wait!! dont leave the Geek Video Community',
      textHtml
    )
  }

    syncUpCRM (name, lastName, email) {
    const hubSpot = new HubSpotHelper()
    return hubSpot.createUser(name, lastName, email)
  }
}

exports.AdminUser = AdminUser
