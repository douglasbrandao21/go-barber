// Importa o arquivo Index dentro da pasta Models. Este arquivo por sí só, já
// possui todos os Models disponíveis. Assim, basta usar desestruturação do ES6
// para importar o model requerido.
const { User } = require('../models')

class UserController {
  // Método create retorna o form para criação de usuário
  create (req, res) {
    return res.render('auth/signup')
  }

  // Método responsável por dar o Store do usuário enviado do formulário via
  // método post
  async store (req, res) {
    const { filename } = req.file
    await User.create({ ...req.body, avatar: filename }) // Cria o usuário através de seu model User
    return res.redirect('/') // Redireciona para a página '/' após a criação
  }
}

module.exports = new UserController()
