const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  // Define um novo model User. Ou seja, uma nova table no nosso banco de dados.
  // User terá os campos definidos a seguir:
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,

      // O campo password, por ser do tipo VIRTUAL não existirá no banco de dados.
      // Este campo servirá apenas como intermédio para a criptografia da senha
      // que final que será armazenada no banco de dados (password_hash)
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  return User
}
