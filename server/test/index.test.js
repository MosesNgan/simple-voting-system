const supertest = require('supertest');
const app = require('../src/app');

describe('Test GET /', () => {
  test('it should responsd with 200 success', async () => {
    const response = await supertest(app)
      .get('/api')
      .expect('Content-Type', /html/)
      .expect(200);

    expect(response.text).toBe('<h1>Simple Voting System works!</h1>');
  });
});
