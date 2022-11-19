const campaignsService = require('../../services/campaigns.service');

class campaignController {

  async getCampaigns(req, res) {
    const campaigns = await campaignsService.getCampaigns();
    return res.status(200).json(campaigns);
  }

  async createCampaign(req, res) {
    const campaign = req.body;

    if (!campaign.topic || !campaign.startedAt || !campaign.endedAt) {
      return res.status(400).json({
        error: 'Missing required campaign property.'
      });
    }

    campaign.startedAt = new Date(campaign.startedAt);
    campaign.endedAt = new Date(campaign.endedAt);
    if (isNaN(campaign.startedAt) || isNaN(campaign.endedAt)) {
      return res.status(400).json({
        error: 'Invalid campaign dates.'
      });
    }

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
        error: 'Campaign not found.',
      });
    }

    await campaignsService.deleteCampaign(campaignId);
    return res.status(204).send();
  }
}

module.exports = new campaignController();
