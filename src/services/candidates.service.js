const candidatesRepository = require('../repositories/candidates.repository');

class CandidatesService {
  constructor() {}

  async getCandidate(id) {
    return await candidatesRepository.getCandidate(id);
  }
}

module.exports = new CandidatesService();
