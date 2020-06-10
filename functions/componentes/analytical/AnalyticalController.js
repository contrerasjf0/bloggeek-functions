const { SMSHelper } = require('../utility/SMSHelper.js')
const functions = require('firebase-functions')

exports.sendShareCoupon = event => {
  const socialNetwork = event.params.method
  
  const phoneNumber = functions.config().configuration.phoneNumberError

  return SMSHelper(
    `Gracias por compartir en ${socialNetwork}, te has ganado un premio`,
    phoneNumber
  ).catch(error => {
    console.error(`${error}`)
  })
}
