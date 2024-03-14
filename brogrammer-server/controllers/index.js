const OpenAI = require('./openAI')
const UserController = require('./userController')
const Subscribe = require('./subscribeController')
const Course = require('./courseController')

const home = (req, res) => {
  res.status(200).json({ message: 'Hello, I am Brogrammer Server App' })
}

module.exports = {
  home,
  register: UserController.register,
  login: UserController.login,
  chatAI: OpenAI.chatAI,
  initPayment: Subscribe.initPayment,
  verifyPayment: Subscribe.verifyPayment,
  getCourses: Course.getCourses
}

