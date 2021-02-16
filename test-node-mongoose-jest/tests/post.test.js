const request = require('supertest');
const app = require('../app');
const db = require('./db');
// const Post = require('../models/Post');

// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('POST /api/posts/create', () => {
  test('It should store a new post',  done => {
    agent
      .post('/api/posts/create')
      .send({ title: 'Some Title', description: 'Some Description' })
      .expect(201)
      .then(res => {
        expect(res.body._id).toBeTruthy();
        done();
      });
  });
});
