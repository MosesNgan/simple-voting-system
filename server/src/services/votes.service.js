const votesRepository = require('../repositories/votes.repository');
const { connect } = require('../db/models/index');

class VotesService {
  constructor() {}

  async getVotes(whereOption) {
    return await votesRepository.getVotes(whereOption);
  }

  async createVote(vote, candidate) {
    const t = await connect().sequelize.transaction();

    const createdVote = await votesRepository.createVote(vote, { transaction: t });
    await candidate.increment('voteCount', { by: 1 }, { transaction: t });

    await t.commit();
    return createdVote;
  }
}

module.exports = new VotesService();
