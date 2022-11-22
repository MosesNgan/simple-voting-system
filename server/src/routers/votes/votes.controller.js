const votesService = require('../../services/votes.service');
const candidatesService = require('../../services/candidates.service');
const campaignsService = require('../../services/campaigns.service');

class VotesController {

  async createVote(req, res) {
    const vote = req.body;

    // TODO: check hkid validity
    const candidate = await candidatesService.getCandidate(vote.candidateId);

    if (!vote.candidateId ||
        !vote.hkidNumber ||
        !candidate) {
      return res.status(422).json({
        code: 'invalid_request_body',
        message: 'Validation failed.'
      });
    }

    const campaign = await campaignsService.getCampaign(candidate.campaignId);

    // check if this HKID have voted in this campaign yet
    const candidatesOfThisCampaign = await campaign.getCandidates();
    const candidateIds = candidatesOfThisCampaign.map((candidate) => candidate.id);

    const voteOfThisHkidInThisCampaign = await votesService.getVotes({
      where: {
        candidateId: candidateIds,
        hkidNumber: vote.hkidNumber
      }
    });
    const voted = voteOfThisHkidInThisCampaign.length > 0;

    if (campaign.endedAt < new Date() ||
        voted) {
      return res.status(422).json({
        code: 'invalid_request_body',
        message: 'Validation failed.'
      });
    }

    const createdVote = await votesService.createVote(vote, candidate);

    return res.status(201).json(createdVote);
  }
}

module.exports = new VotesController();
