const { connect } = require('../db/models/index');

class CandidatesRepository {
  constructor() {
    this.db = connect();
  }

  async getCandidate(id) {
    let data = {};
    try {
      data = await this.db.Candidate.findByPk(id);
    } catch (err) {
      console.log(err);
    }
    return data;
  }
}

module.exports = new CandidatesRepository();