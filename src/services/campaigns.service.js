const campaignRepository = require('../repositories/campaigns.repository');

class CampaignService {
  constructor() {}

  async getCampaigns() {
    return await campaignRepository.getCampaigns();
  }

  async createCampaign(campaign) {
    return await campaignRepository.createCampaign(campaign);
  }

  async deleteCampaign(campaignId) {
    return await campaignRepository.deleteCampaign(campaignId);
  }
}

module.exports = new CampaignService();
