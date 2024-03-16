const { Category } = require("../models")

const getCategories = async (req, res, next) => {
  try {
    const category = await Category.findAll({
      attributes: ['id', 'name', 'description']
    })
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCategories
}