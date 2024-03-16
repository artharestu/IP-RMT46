const app = require('../app');
const request = require('supertest');
const { sign } = require('../helpers/jwt');
const { bulkInsert, bulkDelete } = require('../helpers/tester');

let orderId = "";

describe('GET /subscriber/:CourseId', () => {
  describe('Success', () => {
    test('get subscribers and status 200, when token is valid', async () => {
      const { body, status } = await request(app)
        .get('/subscriber/1')
        .set('Authorization', `Bearer ${token}`)

      expect(body).toHaveProperty('UserId')
      expect(body).toHaveProperty('CourseId')
      expect(body).toHaveProperty('orderId')
      expect(body).toHaveProperty('tokenPayment')
      expect(status).toBe(200);
    })
  })

  describe('Failed', () => {
    test('should return status 401, when token is invalid', async () => {
      const { status, body } = await request(app)
        .get('/subscriber/1')
        .set('Authorization', `Bearer ${token}1`)

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })

    test('should return status 401, when token is empty', async () => {
      const { status, body } = await request(app)
        .get('/subscriber/1')

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })

    test('should return status 404, when course not found', async () => {
      const { status, body } = await request(app)
        .get('/subscriber/100')
        .set('Authorization', `Bearer ${token}`)

      expect(status).toBe(404);
      expect(body).toHaveProperty('message', 'Data not found')
    })
  })
})

describe('GET /subscription/:CourseId', () => {
  describe('Success', () => {
    test('get subscriber and status 200, when token is valid', async () => {
      const { body, status } = await request(app)
        .get('/subscription/2')
        .set('Authorization', `Bearer ${token}`)

      orderId = body.orderId
      expect(body).toHaveProperty('UserId')
      expect(body).toHaveProperty('CourseId')
      expect(body).toHaveProperty('orderId')
      expect(body).toHaveProperty('tokenPayment')
      expect(status).toBe(201);
    })
  })

  describe('Failed', () => {
    test('should return status 401, when token is invalid', async () => {
      const { status, body } = await request(app)
        .get('/subscription/2')
        .set('Authorization', `Bearer ${token}1`)

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })

    test('should return status 401, when token is empty', async () => {
      const { status, body } = await request(app)
        .get('/subscription/2')

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })

    test('should return status 404, when course not found', async () => {
      const { status, body } = await request(app)
        .get('/subscription/100')
        .set('Authorization', `Bearer ${token}`)

      expect(status).toBe(404);
      expect(body).toHaveProperty('message', 'Data not found')
    })

  })
})

describe('PATCH /verify/:orderId', () => {
  describe('Success', () => {
    test('verify payment and status 200, when token is valid', async () => {
      const { body, status } = await request(app)
        .patch(`/verify/${orderId}`)
        .set('Authorization', `Bearer ${token}`)

      expect(body).toHaveProperty('message')
      expect(body).toHaveProperty('status')
      expect(status).toBe(200);
    })
  })

  describe('Failed', () => {
    test('should return status 401, when token is invalid', async () => {
      const { status, body } = await request(app)
        .patch(`/verify/${orderId}`)
        .set('Authorization', `Bearer ${token}1`)

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })

    test('should return status 401, when token is empty', async () => {
      const { status, body } = await request(app)
        .patch(`/verify/${orderId}`)

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })
  })
})

describe('DELETE /subscriber/:CourseId', () => {
  describe('Success', () => {
    test('delete subscriber and status 200, when token is valid', async () => {
      const { body, status } = await request(app)
        .delete('/subscriber/1')
        .set('Authorization', `Bearer ${token}`)

      expect(body).toHaveProperty('message', 'Subscriber has been deleted')
      expect(status).toBe(200);
    })
  })

  describe('Failed', () => {
    test('should return status 401, when token is invalid', async () => {
      const { status, body } = await request(app)
        .delete('/subscriber/1')
        .set('Authorization', `Bearer ${token}1`)

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })

    test('should return status 401, when token is empty', async () => {
      const { status, body } = await request(app)
        .delete('/subscriber/1')

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })

    test('should return status 404, when course not found', async () => {
      const { status, body } = await request(app)
        .delete('/subscriber/100')
        .set('Authorization', `Bearer ${token}`)

      expect(status).toBe(404);
      expect(body).toHaveProperty('message', 'Data not found')
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