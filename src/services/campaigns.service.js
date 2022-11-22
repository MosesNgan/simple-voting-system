const campaignsRepository = require('../repositories/campaigns.repository');

class CampaignsService {
  constructor() {}

  async getCampaigns() {
    return await campaignsRepository.getCampaigns();
  }

  async getCampaign(id) {
    return await campaignsRepository.getCampaign(id);
  }

  async createCampaign(campaign) {
    return await campaignsRepository.createCampaign(campaign);
  }

  async deleteCampaign(campaignId) {
    return await campaignsRepository.deleteCampaign(campaignId);
  }
}

module.exports = new CampaignsService();
