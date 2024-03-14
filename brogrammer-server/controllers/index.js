const OpenAI = require('./openAI')
const User = require('./userController')
const Subscribe = require('./subscribeController')
const Course = require('./courseController')
const Category = require('./categoryController')

const home = (req, res) => {
  res.status(200).json({ message: 'Hello, I am Brogrammer Server App' })
}

module.exports = {
  home,
  register: User.register,
  login: User.login,
  chatAI: OpenAI.chatAI,
  initPayment: Subscribe.initPayment,
  verifyPayment: Subscribe.verifyPayment,
  getCourses: Course.getCourses,
  getCategories: Category.getCategories
}

