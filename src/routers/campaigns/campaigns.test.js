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

describe('Test POST /campaigns', () => {
  const validCampaignData = {
    question: 'Who is the best NBA player in history?',
    startedAt: 'January 1, 2023',
    endedAt: 'January 31, 2023',
    candidateNames: [ 'Michael Jordan', 'Stephen Curry' ],
  };
  const validCampaignDataWithoutDatetime = {
    question: 'Who is the best NBA player in history?'
  };
  const campaignDataWithoutTopic = {
    startedAt: 'January 1, 2023',
    endedAt: 'January 31, 2023',
    candidateNames: [ 'Michael Jordan', 'Stephen Curry' ],
  };

  const campaignDataWithInvalidDatetime = {
    question: 'Who is the best NBA player in history?',
    startedAt: 'xxxxx',
    endedAt: 'January 31, 2023',
    candidateNames: [ 'Michael Jordan', 'Stephen Curry' ],
  };

  const campaignDataWithOneCandidateName = {
    question: 'Who is the best NBA player in history?',
    startedAt: 'January 1, 2023',
    endedAt: 'January 31, 2023',
    candidateNames: [ 'Michael Jordan' ],
  };

  test('it should respond with 201 success.', async () => {
    const response = await supertest(app)
      .post('/campaigns')
      .send(validCampaignData)
      .expect('Content-Type', /json/)
      .expect(201);

    const requestStartedAt = new Date(validCampaignData.startedAt).valueOf();
    const responseStartedAt = new Date(response.body.startedAt).valueOf();
    expect(requestStartedAt).toBe(responseStartedAt);

    const requestEndedAt = new Date(validCampaignData.endedAt).valueOf();
    const responseEndedAt = new Date(response.body.endedAt).valueOf();
    expect(requestEndedAt).toBe(responseEndedAt);

    expect(response.body).toMatchObject(validCampaignDataWithoutDatetime);
  });

  test('it should catch missing property.', async () => {
    const response = await supertest(app)
      .post('/campaigns')
      .send(campaignDataWithoutTopic)
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response.body).toStrictEqual({
      code: 'invalid_request_body',
      message: 'Validation failed.'
    });
  });

  test('it should catch invalid datetime.', async () => {
    const response = await supertest(app)
      .post('/campaigns')
      .send(campaignDataWithInvalidDatetime)
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response.body).toStrictEqual({
      code: 'invalid_request_body',
      message: 'Validation failed.'
    });
  });

  test('it should catch cases with only 1 candidate name provided.', async () => {
    const response = await supertest(app)
      .post('/campaigns')
      .send(campaignDataWithOneCandidateName)
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response.body).toStrictEqual({
      code: 'invalid_request_body',
      message: 'Validation failed.'
    });
  });
});

