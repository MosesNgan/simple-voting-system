'use strict';
const { Model } = require('sequelize');
const { Candidate } = require('./candidate');
const validid = require('validid');

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
      allowNull: false,
      validate: {
        isValidFormat(value) {
          if (!validid.hkid(value)) {
            throw new Error('Invalid HKID Number.');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Vote',
  });
  return Vote;
};