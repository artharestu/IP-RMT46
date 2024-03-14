const { Job } = require('../models')

const authorization = async (req, res, next) => {
  const { id, role } = req.user
  try {
    if (role === 'Admin') {
      next()
    } else if (role === 'Staff') {
      const jobId = req.params.id

      const job = await Job.findByPk(jobId)
      if (!job) throw { name: 'NotFound' }

      if (job.authorId !== user.id) throw { name: 'Forbidden' }

      next()
    } else {
      throw { name: 'Forbidden' }
    }
  } catch (error) {
    next(error)
  }
}

const adminAuth = async (req, res, next) => {
  const { role } = req.user
  try {
    if (role !== 'Admin') throw { name: 'Forbidden' }
    next()
  } catch (error) {
    next(error)
  }
}

const authSubscriber = async (req, res, next) => {
  const userId = req.user.id
  const courseId = req.params.id
  try {
    const subscription = await Subscription.findOne({ where: { userId, courseId } })
    if (!subscription) throw { name: 'Forbidden' }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { authorization, adminAuth }