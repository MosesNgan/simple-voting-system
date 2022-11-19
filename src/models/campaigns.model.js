module.exports = (sequelize, DataTypes, Model) => {

  class Campaigns extends Model {}

  Campaigns.init({
    topic: {
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
    modelName: 'campaigns'
  });

  return Campaigns;
};