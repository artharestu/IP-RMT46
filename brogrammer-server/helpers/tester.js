const { sequelize } = require('../models');
const { hash } = require('../helpers/bcrypt');
const { v4: uuidv4 } = require('uuid');
const { queryInterface } = sequelize;

const bulkInsert = async () => {
  try {
    const dataUsers = require('../data/users.json').map((user) => {
      return {
        email: user.email,
        password: hash(user.password),
        role: user.role,
        authType: user.authType,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('Users', dataUsers, {})

    const profiles = []
    for (let i = 1; i <= dataUsers.length; i++) {
      profiles.push({
        UserId: i,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Profiles', profiles, {})

    const dataCategories = require('../data/categories.json').map((category) => {
      return {
        name: category.name,
        description: category.description,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('Categories', dataCategories, {})

    const dataCourses = require('../data/courses.json').map((course) => {
      return {
        title: course.title,
        description: course.description,
        price: course.price,
        isActive: course.isActive,
        AuthorId: course.AuthorId,
        CategoryId: course.CategoryId,
        videoThumbnail: course.videoThumbnail,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('Courses', dataCourses, {})

    const dataVideos = require('../data/videos.json').map((video) => {
      return {
        title: video.title,
        description: video.description,
        urlVideo: video.urlVideo,
        part: video.part,
        CourseId: video.CourseId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('Videos', dataVideos, {})

    const dataSubscribers = [
      {
        UserId: 1,
        CourseId: 1,
        status: 'pending',
        orderId: uuidv4(),
        tokenPayment: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('Subscribers', dataSubscribers, {})

  } catch (error) {
    console.log(error)
  }
}

const bulkDelete = async () => {
  await queryInterface.bulkDelete('Subscribers', null, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  });

  await queryInterface.bulkDelete('Videos', null, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  });

  await queryInterface.bulkDelete('Courses', null, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  });

  await queryInterface.bulkDelete('Users', null, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  });

  await queryInterface.bulkDelete('Categories', null, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  });
}

module.exports = { bulkInsert, bulkDelete }