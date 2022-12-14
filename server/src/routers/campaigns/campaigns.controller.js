const campaignsService = require('../../services/campaigns.service');

class CampaignsController {

  async getCampaigns(req, res) {
    const campaigns = await campaignsService.getCampaigns();
    return res.status(200).json(campaigns);
  }

  async createCampaign(req, res) {
    const campaign = req.body;
    campaign.startedAt = new Date(campaign.startedAt);
    campaign.endedAt = new Date(campaign.endedAt);

    if (!campaign.question ||
        !campaign.startedAt ||
        !campaign.endedAt ||
        !campaign.candidateNames ||
        isNaN(campaign.startedAt) ||
        isNaN(campaign.endedAt) ||
        campaign.candidateNames.length < 2) {
      return res.status(422).json({
        code: 'invalid_request_body',
        message: 'Validation failed.'
      });
    }

    const candidatesData = campaign.candidateNames.map((name) => {
      return {
        name: name,
        voteCount: 0
      };
    });
    delete campaign.candidateNames;
    campaign.candidates = candidatesData;

    const createdCampaign = await campaignsService.createCampaign(campaign);
    return res.status(201).json(createdCampaign);
  }

  async deleteCampaign(req, res) {
    const campaignId = Number(req.params.id);

    const ids = [];
    for (const [ key, value ] of Object.entries(await campaignsService.getCampaigns())) {
      ids.push(value.getDataValue('id'));
    }

    if (!ids.includes(campaignId)) {
      return res.status(404).json({
        code: 'resource_not_found',
        message: 'Recource doesn\'t exist.'
      });
    }

    await campaignsService.deleteCampaign(campaignId);
    return res.status(204).send();
  }
}

module.exports = new CampaignsController();
