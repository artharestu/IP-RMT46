const app = require('../app');
const request = require('supertest');
const { sign } = require('../helpers/jwt');
const { bulkInsert, bulkDelete } = require('../helpers/tester');

let token = ""

describe('POST /chat', () => {
  describe('Success', () => {
    test('should return status 200, when token is valid', async () => {
      const { body, status } = await request(app)
        .post('/chat')
        .set('Authorization', `Bearer ${token}`)
        .send({
          message: 'Jelaskan tentang javascript'
        })

      expect(body).toHaveProperty('message')
      expect(status).toBe(200);
    }, 10000)
  })

  describe('Failed', () => {
    test('should return status 401, when token is invalid', async () => {
      const { status, body } = await request(app)
        .post('/chat')
        .set('Authorization', `Bearer ${token}1`)
        .send({
          message: 'Jelaskan tentang javascript'
        })

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })

    test('should return status 401, when token is empty', async () => {
      const { status, body } = await request(app)
        .post('/chat')
        .send({
          message: 'Jelaskan tentang javascript'
        })

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })

    test('should return status 401, when message is empty', async () => {
      const { status, body } = await request(app)
        .post('/chat')
        .set('Authorization', `Bearer ${token}`)

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Invalid data input')
    })

    test('should return status 401, when message is null', async () => {
      const { status, body } = await request(app)
        .post('/chat')
        .set('Authorization', `Bearer ${token}`)
        .send({
          message: null
        })

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Invalid data input')
    })

    test('should return status 401, when message is undefined', async () => {
      const { status, body } = await request(app)
        .post('/chat')
        .set('Authorization', `Bearer ${token}`)
        .send({
          message: undefined
        })

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Invalid data input')
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