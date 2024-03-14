const { Profile } = require("../models")

const updateProfile = async (req, res, next) => {
  const { id } = req.user
  const { firstName, lastName, bio, dateOfBirth, phoneNumber } = req.body
  try {
    const profile = await Profile.update(
      {
        firstName,
        lastName,
        bio,
        dateOfBirth,
        phoneNumber
      },
      {
        where: {
          UserId: id
        }
      }
    )
    res.status(200).json(profile)
  } catch (error) {
    next(error)
  }
}

const updateProfilePicture = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) throw { name: 'InvalidData' }

    if (!req.file) throw { name: 'InvalidData' }

    const profile = await Profile.findByPk(id)
    if (!profile) throw { name: 'NotFound' }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const mimetype = req.file.mimetype
    const data = Buffer.from(req.file.buffer).toString('base64')
    const dataURI = `data:${mimetype};base64,${data}`

    const result = await cloudinary.uploader.upload(dataURI, {
      public_id: profile.id,
      overwrite: true
    })

    await profile.update({ profilePicture: result.secure_url })

    res.status(200).json({ message: `Image ${result.secure_url} success to update` })
  } catch (error) {
    next(error)
  }

}
module.exports = {
  updateProfile,
  updateProfilePicture
}