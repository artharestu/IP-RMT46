const OpenAI = require('./openAI')
const UserController = require('./userController')
const home = (req, res) => {
  res.status(200).json({ message: 'Hello Brogrammer' })
}

module.exports = {
  home,
  register: UserController.register,
  login: UserController.login,
  chatAI: OpenAI.chatAI
}

