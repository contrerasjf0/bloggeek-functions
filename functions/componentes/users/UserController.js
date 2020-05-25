const { UserAdmin } = require('./UserAdmin.js')

exports.userCreationController = user => {
  const userAdmin = new UserAdmin()

  return userAdmin
    .enviarEmailBienvenida(user.displayName, user.email)
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

exports.UserRemoveController = user => {
  const userAdmin = new UserAdmin()

  return userAdmin
    .enviarEmailDespedida(user.displayName, user.email)
    .catch(error => {
      console.error(`User creation failed => ${error}`)
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
