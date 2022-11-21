const supertest = require('supertest');
const app = require('../../app');

describe('Test GET /campaigns', () => {
  const desiredCampaignResponse = {
    id: expect.any(Number),
    question: expect.any(String),
    candidates: expect.any(Array)
  };
  test('it should respond with 200 success', async () => {
    const response = await supertest(app)
      .get('/campaigns')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    response.body.every(campaign => {
      expect(campaign).toMatchObject(desiredCampaignResponse);

      expect(new Date(campaign.startedAt)).toBeInstanceOf(Date);
      expect(new Date(campaign.endedAt)).toBeInstanceOf(Date);
    });
  });
});

