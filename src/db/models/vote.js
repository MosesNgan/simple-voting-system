'use strict';
const { Model } = require('sequelize');
const { Candidate } = require('./candidate');

module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    static associate(models) {
      Vote.belongsTo(models.Candidate, {
        as: 'candidate',
        foreignKey: {
          name: 'candidateId',
          allowNull: false
        }
      });
    }
  }
  Vote.init({
    candidateId: {
      type: DataTypes.INTEGER,
      references: {
        model: Candidate,
        key: 'id',
      },
      allowNull: false
    },
    hkidNumber: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Vote',
  });
  return Vote;
};