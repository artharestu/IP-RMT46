const app = require('../app');
const request = require('supertest');
const { sign } = require('../helpers/jwt');
const { bulkInsert, bulkDelete } = require('../helpers/tester');

let token = null

describe('GET /categories', () => {
  describe('Success', () => {
    test('should return status 200 and get categories', async () => {
      const { status, body } = await request(app)
        .get('/categories')
        .set('Authorization', `Bearer ${token}`)

      expect(body).toBeInstanceOf(Array)
      expect(status).toBe(200)
    })
  })

  describe('Failed', () => {
    test('should return status 401 and error message when token is null', async () => {
      const { status, body } = await request(app)
        .get('/categories')

      expect(body).toHaveProperty('message', 'Unauthorized access')
      expect(status).toBe(401)
    })

    test('should return status 401 and error message when token is invalid', async () => {
      const { status, body } = await request(app)
        .get('/categories')
        .set('Authorization', `Bearer invalid-token`)

      expect(body).toHaveProperty('message', 'Unauthorized access')
      expect(status).toBe(401)
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