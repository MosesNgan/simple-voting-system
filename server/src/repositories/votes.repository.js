const { connect } = require('../db/models/index');

class VotesRepository {
  constructor() {
    this.db = connect();
  }

  async getVotes(whereOption) {
    try {
      const votes = await this.db.Vote.findAll(whereOption);
      return votes;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async createVote(vote) {
    let data = {};
    try {
      data = await this.db.Vote.create(vote);

    } catch(err) {
      console.log(err);
    }
    return data;
  }
}

module.exports = new VotesRepository();