const { connect } = require('../db/models/index');

class CampaignsRepository {
  constructor() {
    this.db = connect();
  }

  async getCampaigns() {
    try {
      const campaigns = await this.db.Campaign.findAll({ include: 'candidates' });
      // TODO: add sorting rules
      return campaigns;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async getCampaign(id) {
    let data = {};
    try {
      data = await this.db.Campaign.findByPk(id, { include: 'candidates' });
    } catch (err) {
      console.log(err);
    }
    return data;
  }

  async createCampaign(campaign) {
    let data = {};
    try {
      data = await this.db.Campaign.create(campaign,
        {
          include: [ 'candidates' ]
        }
      );
    } catch(err) {
      console.log(err);
    }
    return data;
  }

  async deleteCampaign(campaignId) {
    let data = {};
    try {
      data = await this.db.Campaign.destroy({
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