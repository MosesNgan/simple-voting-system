const supertest = require('supertest');
const app = require('../../app');
const campaignsRepository = require('../../repositories/campaigns.repository');
const candidatesRepository = require('../../repositories/candidates.repository');

const ongoingCampaignData = {
  question: 'Who is the best NBA player in history?',
  startedAt: 'January 1, 2022',
  endedAt: 'December 31, 2100',
  candidateNames: [ 'Michael Jordan', 'Stephen Curry' ],
};

const endedCampaignData = {
  question: 'Who is the best NBA player in history?',
  startedAt: 'January 1, 2000',
  endedAt: 'December 31, 2020',
  candidateNames: [ 'Michael Jordan', 'Stephen Curry' ],
};

const createCampaign = async (campaignData) => {
  const response = await supertest(app)
    .post('/campaigns')
    .send(campaignData);

  const newCampaign = response.body;
  return newCampaign;
};

const getValidCandidate = async (campaignId) => {
  const campaign = await campaignsRepository.getCampaign(campaignId);
  const candidates = await campaign.getCandidates();
  const candidateId = candidates[0].id;
  const candidate = await candidatesRepository.getCandidate(candidateId);

  return candidate;
};

const validHkidNumber = 'A123456(7)';

describe('Test POST /votes', () => {
  test('it should respond with 201 success.', async () => {
    const ongoingCampaign = await createCampaign(ongoingCampaignData);
    const candidate = await getValidCandidate(ongoingCampaign.id);
    const originalVoteCount = candidate.voteCount;

    const validVoteData = {
      hkidNumber: validHkidNumber,
      candidateId: candidate.id,
    };

    const response = await supertest(app)
      .post('/votes')
      .send(validVoteData)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toMatchObject(validVoteData);

    const votedCandidate = await candidatesRepository.getCandidate(candidate.id);
    expect(votedCandidate.voteCount).toBe(originalVoteCount + 1);
  });

  test('it should catch missing property.', async () => {
    const ongoingCampaign = await createCampaign(ongoingCampaignData);
    const candidate = await getValidCandidate(ongoingCampaign.id);
    const voteDataWithoutHkidNumber = {
      candidateId: candidate.id
    };

    const response = await supertest(app)
      .post('/votes')
      .send(voteDataWithoutHkidNumber)
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response.body).toStrictEqual({
      code: 'invalid_request_body',
      message: 'Validation failed.'
    });
  });

  test('it should catch candidate that doesn\'t exist.', async () => {
    const voteDataWithInvalidCandidateId = {
      candidateId: 0
    };

    const response = await supertest(app)
      .post('/votes')
      .send(voteDataWithInvalidCandidateId)
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response.body).toStrictEqual({
      code: 'invalid_request_body',
      message: 'Validation failed.'
    });
  });

  test('it should catch ended campaigns.', async () => {
    const endedCampaign = await createCampaign(endedCampaignData);
    const candidateFromAnEndedCampaign = await getValidCandidate(endedCampaign.id);
    const voteData = {
      hkidNumber: validHkidNumber,
      candidateId: candidateFromAnEndedCampaign.id,
    };

    const response = await supertest(app)
      .post('/votes')
      .send(voteData)
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response.body).toStrictEqual({
      code: 'invalid_request_body',
      message: 'Validation failed.'
    });
  });

  test.skip('it should catch invalid HKID Number.', async () => {
  });
});
