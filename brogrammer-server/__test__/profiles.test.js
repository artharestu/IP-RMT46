const app = require('../app');
const request = require('supertest');
const { sign } = require('../helpers/jwt');
const { bulkInsert, bulkDelete } = require('../helpers/tester');

const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '../data/boy.jpg');
const image = fs.createReadStream(filePath);

describe('GET /profiles', () => {
  describe('Success', () => {
    test('get profile and status 200, when token is valid', async () => {
      const { body, status } = await request(app)
        .get('/profile')
        .set('Authorization', `Bearer ${token}`)

      expect(body).toHaveProperty('firstName')
      expect(body).toHaveProperty('lastName')
      expect(body).toHaveProperty('bio')
      expect(body).toHaveProperty('dateOfBirth')
      expect(body).toHaveProperty('phoneNumber')
      expect(body).toHaveProperty('profilePicture')
      expect(status).toBe(200);
    })
  })

  describe('Failed', () => {
    test('should return status 401, when token is invalid', async () => {
      const { status, body } = await request(app)
        .get('/profile')
        .set('Authorization', `Bearer ${token}1`)

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })

    test('should return status 401, when token is empty', async () => {
      const { status, body } = await request(app)
        .get('/profile')

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })
  })
})

describe('PUT /profile', () => {
  describe('Success', () => {
    test('should return status 200, when token is valid', async () => {
      const { status, body } = await request(app)
        .put('/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'test',
          lastName: 'test',
          bio: 'test',
          dateOfBirth: '2020-12-12',
          phoneNumber: 'test',
          profilePicture: 'test',
        })

      expect(status).toBe(200);
      expect(body).toHaveProperty('message', 'Profile success to update')
    })
  })

  describe('Failed', () => {
    test('should return status 401, when token is invalid', async () => {
      const { status, body } = await request(app)
        .put('/profile')
        .set('Authorization', `Bearer ${token}1`)
        .send({
          firstName: 'test',
          lastName: 'test',
          bio: 'test',
          dateOfBirth: 'test',
          phoneNumber: 'test',
          profilePicture: 'test',
        })

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })

    test('should return status 401, when token is empty', async () => {
      const { status, body } = await request(app)
        .put('/profile')
        .send({
          firstName: 'test',
          lastName: 'test',
          bio: 'test',
          dateOfBirth: 'test',
          phoneNumber: 'test',
          profilePicture: 'test',
        })

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access')
    })
  })
})

describe('PATCH /profile', () => {
  describe('Success', () => {
    test('should return status code 200 and an object when user authorized and update image', async () => {
      const { status, body } = await request(app)
        .patch('/profile')
        .set('Authorization', `Bearer ${token}`)
        .attach('profilePicture', image, 'boy.jpg')

      expect(status).toBe(200);
      expect(body).toHaveProperty('message', expect.any(String));
    }, 10000);
  })

  describe('Failed', () => {
    test('should return status code 401 and an object when user not login', async () => {
      const { status, body } = await request(app)
        .patch('/profile')

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access');
    });

    test('should return status code 401 and an object when token is not valid', async () => {
      const { status, body } = await request(app)
        .patch('/profile')
        .set('Authorization', `Wrong token`)
        .attach('profilePicture', image, 'boy.jpg')

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Unauthorized access');
    });
  })
})

beforeAll(async () => {
  await bulkInsert()
  token = sign({ id: 1 });
})

afterAll(async () => {
  await bulkDelete()
})