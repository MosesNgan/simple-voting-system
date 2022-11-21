'use strict';
const { Model } = require('sequelize');
const { Campaign } = require('./campaign');

module.exports = (sequelize, DataTypes) => {
  class Candidate extends Model {
    static associate(models) {
      Candidate.belongsTo(models.Campaign, {
        as: 'campaign',
        foreignKey: {
          name: 'campaignId',
          allowNull: false
        }
      });
    }
  }
  Candidate.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    campaignId: {
      type: DataTypes.INTEGER,
      references: {
        model: Campaign,
        key: 'id',
      },
      allowNull: false
    },
    voteCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Candidate',
  });
  return Candidate;
};