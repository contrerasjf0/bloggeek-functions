const { UserAdmin } = require('./UserAdmin.js')

exports.userCreationController = user => {
  const userAdmin = new UserAdmin()

  return userAdmin
    .sendWelcomeEmail(user.displayName, user.email)
    .then(() => {
      return UserAdmin.registerUserEmail(
        user.displayName,
        user.email
      )
    })
    .catch(error => {
      console.error(`User creation failed => ${error}`)
    })
}

exports.userRemoveController = user => {
  const userAdmin = new UserAdmin()

  return userAdmin
    .sendFarewellEmail(user.displayName, user.email)
    .catch(error => {
      console.error(`Error to send Farewell Email => ${error}`)
    })
}

exports.creacionUsuarioCRM = user => {
  const userAdmin = new UserAdmin()
  
  return userAdmin.asyncUpCRM(
    user.displayName,
    user.displayName,
    user.email
  )
}
