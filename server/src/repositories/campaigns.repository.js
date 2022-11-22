const { connect } = require('../db/models/index');

class CampaignsRepository {
  constructor() {
    this.db = connect();
  }

  async getCampaigns() {
    try {
      const campaigns = await this.db.Campaign.findAll({ include: 'candidates' });

      // sorting start
      let sortedCampaigns = [];

      const onGoingCampaigns = campaigns.filter(campaign => campaign.startedAt < new Date() && campaign.endedAt > new Date());
      const endedCampaigns = campaigns.filter(campaign => campaign.endedAt < new Date());

      // sort by total vote count for ongoing campaigns
      const sortedOngoingCampaigns = onGoingCampaigns.sort((a, b) =>  {
        return a.candidates.reduce((totalVote, candidate) => totalVote + candidate.voteCount, 0) > b.candidates.reduce((totalVote, candidate) => totalVote + candidate.voteCount, 0);
      });
      // sort by most recent end time for ended campaigns
      const sortedEndedCampaigns = endedCampaigns.sort((a, b) =>  a.endedAt < b.endedAt );

      // ongoing come first, then ended
      sortedCampaigns = sortedOngoingCampaigns.concat(sortedEndedCampaigns);
      // sorting end

      return sortedCampaigns;
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