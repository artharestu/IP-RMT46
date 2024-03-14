const { Course, Category, Video, User } = require("../models")
const { Op } = require('sequelize');

const getCourses = async (req, res, next) => {
  const { authorId, sort, page, search, categoryId } = req.query
  const options = {
    include: [
      {
        model: Category,
        attributes: ['name']
      }
    ],
    where: {}
  }

  if (authorId) options.where.AuthorId = +authorId;
  if (categoryId) options.where.CategoryId = +categoryId;

  (sort === 'DESC') ? options.order = [['createdAt', 'DESC']] : options.order = [['createdAt', 'ASC']];

  if (search) {
    if (!options.where) {
      options.where = {}
    }
    options.where.title = { [Op.iLike]: `%${search}%` }
  }

  let limit = 0;
  if (page) {
    limit = 9
    options.limit = limit
    options.offset = (page - 1) * limit
  }

  try {
    const { rows, count } = await Course.findAndCountAll(options)
    res.status(200).json({
      page: (!page) ? 1 : page,
      data: rows,
      totalData: count,
      totalPage: limit === 0 ? 1 : Math.ceil(count / limit),
      dataPerPage: limit === 0 ? count : limit
    });
  } catch (error) {
    next(error)
  }
}

const getDetailCourse = async (req, res, next) => {
  const { id } = req.params
  try {
    const course = await Course.findOne({
      where: { id },
      include: [
        {
          model: Category,
          attributes: ['name']
        },
        {
          model: Video,
          attributes: ['id', 'title', 'urlVideo', 'part', 'description']
        },
        {
          model: User,
          attributes: ['email']
        }
      ]
    })
    res.status(200).json(course)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = {
  getCourses,
  getDetailCourse
}