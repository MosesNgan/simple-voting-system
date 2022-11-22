const { connect } = require('../db/models/index');

class VotesRepository {
  constructor() {
    this.db = connect();
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