const requestAPI = require('request')
const functions = require('firebase-functions')

const claveapihubspot = functions.config().configuration.claveapihubspot

class HubSpotHelper {
  createUser (name, lastName, email) {
    return requestAPI.post(
      {
        headers: {
          'content-type': 'application/json'
        },
        url: `https://api.hubapi.com/contacts/v1/contact/?hapikey=${claveapihubspot}`,
        body: JSON.stringify({
          properties: [
            {
              property: 'email',
              value: email
            },
            {
              property: 'firstname',
              value: name
            },
            {
              property: 'lastname',
              value: lastName
            }
          ]
        })
      },
      (error, response, body) => {
        if (error) {
          return console.error(error)
        }
        return console.log(JSON.parse(body))
      }
    )
  }
}

exports.HubSpotHelper = HubSpotHelper
