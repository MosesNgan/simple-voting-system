const { connect } = require('../config/db.config');

class CampaignsRepository {
  constructor() {
    this.db = connect();
  }

  async getCampaigns() {
    try {
      const campaigns = await this.db.campaigns.findAll();
      // TODO: add sorting rules
      return campaigns;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async createCampaign(campaign) {
    let data = {};
    try {
      campaign.createdate = new Date().toISOString();
      data = await this.db.campaigns.create(campaign);
    } catch(err) {
      console.log(err);
    }
    return data;
  }

  async deleteCampaign(campaignId) {
    let data = {};
    try {
      data = await this.db.campaigns.destroy({
        where: {
          id: campaignId
        }
      });
    } catch(err) {
      console.log(err);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}

module.exports = new CampaignsRepository();