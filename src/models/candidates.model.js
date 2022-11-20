const Campaigns = require('./campaigns.model');

module.exports = (sequelize, DataTypes, Model) => {

  class Candidates extends Model {}

  Candidates.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    campaignId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Campaigns,
        key: 'id'
      }
    },
    voteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'candidates'
  });

  return Candidates;
};