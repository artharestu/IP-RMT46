const OpenAI = require('./openAI')
const User = require('./userController')
const Subscribe = require('./subscribeController')
const Course = require('./courseController')
const Category = require('./categoryController')
const Video = require('./videoController')
const Profile = require('./profileController')

const home = (req, res) => {
  res.status(200).json({ message: 'Hello, I am Brogrammer Server App' })
}

module.exports = {
  home,
  register: User.register,
  login: User.login,
  chatAI: OpenAI.chatAI,
  getCourses: Course.getCourses,
  getDetailCourse: Course.getDetailCourse,
  getCategories: Category.getCategories,
  verifyPayment: Subscribe.verifyPayment,
  addSubscriber: Subscribe.addSubscriber,
  getSubscriber: Subscribe.getSubscriber,
  getVideo: Video.getVideo,
  updateProfile: Profile.updateProfile,
  updateProfilePicture: Profile.updateProfilePicture
}

