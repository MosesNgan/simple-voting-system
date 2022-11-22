const votesRepository = require('../repositories/votes.repository');

class VotesService {
  constructor() {}

  async getVotes(whereOption) {
    return await votesRepository.getVotes(whereOption);
  }

  async createVote(vote, candidate) {
    // TODO: wrap into one transaction
    const createdVote = await votesRepository.createVote(vote);
    await candidate.increment('voteCount', { by: 1 });
    return createdVote;
  }
}

module.exports = new VotesService();
