const app = require('../app');
const request = require('supertest');
const { sign } = require('../helpers/jwt');
const { bulkInsert, bulkDelete } = require('../helpers/tester');

describe('GET /courses', () => {
  describe('Success', () => {
    test('get courses and status 200, when token is valid', async () => {
      const { body, status } = await request(app)
        .get('/courses?authorId=1&sort=DESC&page=1&search=belajar,categoryId=1')
        .set('Authorization', `Bearer ${token}`)

      expect(body).toHaveProperty('data')
      expect(body).toHaveProperty('totalPage')
      expect(body).toHaveProperty('dataPerPage')
      expect(status).toBe(200);
    })
  })

  describe('Failed', () => {
    test('should return status 401, when token is invalid', async () => {
      const { status, body } = await request(app)
        .get('/courses')
        .set('Authorization', `Bearer ${token}1`)

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })

    test('should return status 401, when token is empty', async () => {
      const { status, body } = await request(app)
        .get('/courses')

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })
  })
})

describe('GET /course/:id', () => {
  describe('Success', () => {
    test('get course and status 200, when token is valid', async () => {
      const { body, status } = await request(app)
        .get('/course/1')
        .set('Authorization', `Bearer ${token}`)

      expect(body).toHaveProperty('id')
      expect(body).toHaveProperty('title')
      expect(body).toHaveProperty('urlVideo')
      expect(body).toHaveProperty('part')
      expect(body).toHaveProperty('description')
      expect(status).toBe(200);
    })
  })

  describe('Failed', () => {
    test('should return status 401, when token is invalid', async () => {
      const { status, body } = await request(app)
        .get('/course/1')
        .set('Authorization', `Bearer ${token}1`)

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })

    test('should return status 401, when token is empty', async () => {
      const { status, body } = await request(app)
        .get('/course/1')

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })
  })
})

describe('GET /mycourses', () => {
  describe('Success', () => {
    test('get mycourses and status 200, when token is valid', async () => {
      const { body, status } = await request(app)
        .get('/mycourses')
        .set('Authorization', `Bearer ${token}`)

      expect(body).toHaveProperty('data')
      expect(body).toHaveProperty('totalPage')
      expect(body).toHaveProperty('dataPerPage')
      expect(status).toBe(200);
    })
  })

  describe('Failed', () => {
    test('should return status 401, when token is invalid', async () => {
      const { status, body } = await request(app)
        .get('/mycourses')
        .set('Authorization', `Bearer ${token}1`)

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })

    test('should return status 401, when token is empty', async () => {
      const { status, body } = await request(app)
        .get('/mycourses')

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })
  })
})


beforeAll(async () => {
  await bulkInsert()
  token = sign({ id: 1 });
})

afterAll(async () => {
  await bulkDelete()
})