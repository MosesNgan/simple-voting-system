'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    static associate(models) {
      Campaign.hasMany(models.Candidate, { as:'candidates', foreignKey:'campaignId' });
    }
  }
  Campaign.init({
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Campaign',
  });
  return Campaign;
};
