const { Job } = require('../models')

const authorization = async (req, res, next) => {
  const { role } = req.user
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

module.exports = { authorization, adminAuth }