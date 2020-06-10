const { SMSHelper } = require('./../utility/SMSHelper.js')
const functions = require('firebase-functions')

exports.handler = issue => {

  const titulo = issue.issueTitle
  const appName = issue.appName

  const phoneNumber = functions.config().configuration.phoneNumberError

  const messaje = `Error on the ${appName} app => ${titulo}`

  return SMSHelper(messaje, phoneNumber).catch(error =>
    console.error(`${error}`)
  )
}
