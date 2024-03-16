const app = require('../app');
const request = require('supertest');
const { sign } = require('../helpers/jwt');
const { bulkInsert, bulkDelete } = require('../helpers/tester');

const userAdmin = {
  email: "sudosu@gmail.com",
  password: "admin",
}

describe('POST /login', () => {
  describe('Success', () => {
    test('should return token and status 200, when email and password is correct', async () => {
      const { body, status } = await request(app)
        .post('/login')
        .send(userAdmin)

      expect(status).toBe(200)
      expect(body).toHaveProperty('access_token', expect.any(String))
    })
  })
  describe('Failed', () => {
    test('should return error and status 401, when email is incorrect', async () => {
      const { body, status } = await request(app)
        .post('/login')
        .send({
          email: "su@gmail.com",
          password: "admin"
        })

      expect(status).toBe(401)
      expect(body).toHaveProperty('message', 'Invalid email or password')
    })

    test('should return error and status 401, when password is incorrect', async () => {
      const { body, status } = await request(app)
        .post('/login')
        .send({
          email: "sudosu@gmail.com",
          password: "admin1"
        })

      expect(status).toBe(401)
      expect(body).toHaveProperty('message', 'Invalid email or password')
    })

    test('should return error and status 401, when email is empty', async () => {
      const { body, status } = await request(app)
        .post('/login')
        .send({
          email: "",
          password: "admin"
        })

      expect(status).toBe(401)
      expect(body).toHaveProperty('message', 'Invalid email or password')
    })

    test('should return error and status 401, when password is empty', async () => {
      const { body, status } = await request(app)
        .post('/login')
        .send({
          email: "sudosu@gmail.com",
          password: ""
        })

      expect(status).toBe(401)
      expect(body).toHaveProperty('message', 'Invalid email or password')
    })

    test('should return error and status 401, when email and password is null', async () => {
      const { body, status } = await request(app)
        .post('/login')
        .send(null)

      expect(status).toBe(401)
      expect(body).toHaveProperty('message', 'Invalid email or password')
    })
  })
})

describe('POST /register', () => {
  describe('Success', () => {
    test('should return status 201, when email and password is correct', async () => {
      const { status, body } = await request(app)
        .post('/register')
        .send({
          email: "adminadmin@gmail.com",
          password: "admin"
        })

      expect(status).toBe(201)
      expect(body).toHaveProperty('email', 'adminadmin@gmail.com')
      expect(body).toHaveProperty('role', 'member')
    })
  })

  describe('Failed', () => {
    test('should return error and status 400, when email is already exist', async () => {
      const { status, body } = await request(app)
        .post('/register')
        .send({
          email: "sudosu@gmail.com",
          password: "admin"
        })

      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Data already exist')
    })

    test('should return error and status 400, when email is empty', async () => {
      const { status, body } = await request(app)
        .post('/register')
        .send({
          email: "",
          password: "admin"
        })

      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Email is required')
    })

    test('should return error and status 400, when password is empty', async () => {
      const { status, body } = await request(app)
        .post('/register')
        .send({
          email: "sudosu@gmail.com",
          password: ""
        })

      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Password is required')
    })
  })
})

describe('POST /google-login', () => {
  describe('Failed', () => {
    test('should return error and status 401, when google token is invalid', async () => {
      const { body, status } = await request(app)
        .post('/google-login')
        .send({
          googleToken: 'token'
        })

      expect(status).toBe(500)
      expect(body).toHaveProperty('message', 'Internal Server Error')
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