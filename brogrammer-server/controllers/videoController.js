const { Video } = require("../models")

const getVideo = async (req, res, next) => {
  const { videoId } = req.params
  try {
    const video = await Video.findByPk(videoId)
    if (!video) throw { name: 'NotFound' }

    res.status(200).json(video)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getVideo
}