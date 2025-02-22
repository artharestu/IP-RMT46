const { Category } = require("../models")

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name', 'description']
    })
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCategories
}